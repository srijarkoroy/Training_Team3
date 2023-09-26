import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import bcrypt from "bcryptjs";
import Modal from "react-modal";
import "../styles/ModalStyle.css";
import { useNavigate } from "react-router-dom";

const salt = bcrypt.genSaltSync(10);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
Modal.setAppElement('#root');
export default function Withdraw() {
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const confi = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };
  const userCheck = async () => {
    try{
      const ad = await axios.get('http://localhost:8090/admin/adminCheck', confi);
      console.log(ad);
      if (ad.data !== false) {
        navigate("/");
      }
    } catch (error){
      setIsError(error);
    }
  }
  useEffect(() => {
    userCheck();
  }, []);

  useEffect(() => {
    if(isError !== ""){
      console.log("inside use", isError);
      if(isError.response.data.status === 401){
        setMssg("Session Expired");
        setIsModalOpen(true);
      } else if(isError.response.status === 404){
        setMssg(isError.response.data);
      } else{
        setMssg("Some error occured");
      }
      setIsModalOpen(true);
    }
  }, [isError])

  const [error, setError] = useState("");
  const [mssg, setMssg] = useState("");
  const [res, setRes] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/user/withdraw";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        accNo: data.get("accNo"),
        amount: data.get("amount"),
        transactionPassword: data.get("password")
      };
      console.log(sendData);
      try {
        const resData = await axios.post(url, sendData, {headers : {'Authorization': 'Bearer ' + String(localStorage.getItem('token'))}});
        if(resData.status === 200) {
          console.log("finish api call - response:::", resData);
          setRes(resData.data);
          console.log("res passed:::", res.data);
          setIsModalOpen(true);
        //   const token = resData.data.token;
        //   localStorage.setItem('token', token);
        } else {
          console.log("Authentication Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
          // setRes(error.response.data);
          setIsError(error);
          // setIsModalOpen(true);
          console.log(res);
        };
    }
  };

  const [accNo, setAccNo] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionPassword, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccNoChange = (e) => {
    setAccNo(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // const accNoPattern = /.,'^[0-9]{10}$/;
    const transactionPasswordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    // if (!accNo.match(accNoPattern)) {
    //   setError("Account Number should be 11-digits long.");
    if (!transactionPassword.match(transactionPasswordPattern)) {
      setError(
        "Password must be at least 8 characters long and contain alphabets, numbers, and special symbols."
      );
    } else {
      // setUsername("");
      // setPassword("");
      setError("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRes("");
    if(mssg === "Session Expired"){
      setMssg("");
      navigate("/");
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Withdrawal
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {res && 
              <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Token Modal"
                margin="normal"
                fullWidth
                className="custom-modal"
              >
                <h3>{res}</h3>
                <button onClick={closeModal} color="red">Close</button>
              </Modal>}
              {mssg && 
              <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Token Modal"
                margin="normal"
                fullWidth
                className="custom-modal"
              >
                <h3>{mssg}</h3>
                <button onClick={closeModal} color="red">Close</button>
              </Modal>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="accNo"
              label="Account Number"
              name="accNo"
              autoComplete="accNo"
              color="error"
              autoFocus
              value={accNo}
              onChange={handleAccNoChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="amount"
              color="error"
              value={amount}
              onChange={handleAmountChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="error"
              value={transactionPassword}
              onChange={handlePasswordChange}
            />
            {/* <Link to={'/viewtransactionhistory'} state={res}> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              onClick={handleLogin}
            >
              Withdraw
            </Button>
            {/* </Link> */}

            {error && (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              onClick={handleToken}
            >
              Send Token
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="error">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/openaccount" variant="body2" color="error">
                  {"Open Bank Account"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" color="error">
                  {"Don't have netbanking? Register here"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}