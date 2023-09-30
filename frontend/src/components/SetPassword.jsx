import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "../styles/ModalStyle.css";
import Endpoints from "./Endpoints.js"



const defaultTheme = createTheme();

export default function SetPassword() {
  const [mssg, setMssg] = useState("");
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const confi = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };
  const userCheck = async () => {
    try {
      const ad = await axios.get(Endpoints.BASE_URL_ADMIN + '/adminCheck', confi);
      console.log(ad);
      if (ad.data !== false) {
        navigate("/");
      }
    } catch(error){
      setIsError(error);
    }
  }
  useEffect(() => {
    userCheck();
    handleAccounts();
  }, []);
  useEffect(() => {
    if(isError !== ""){
      console.log("inside use", isError);
      if(isError.response.status === 404){
        setMssg(isError.response.data);
      }else if(isError.response.data.status === 401){
        setMssg("Session Expired");
      } else{
        setMssg("Some error occured");
      }
      setIsModalOpen(true);
    }
  }, [isError])

  const [accounts, setAccounts] = useState([]);
  const handleAccounts = async () => {
    const url = Endpoints.BASE_URL_USER + "/userAccounts";
    const header = { "Content-Type": "application/json" };

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    try {
      const resData = await axios.get(url, config);
      if (resData.status === 200) {
        console.log("finish api call - response:::", resData.data);
      } else {
        console.log("API Call Failed");
      }
      setAccounts(resData.data);
    } catch (error) {
      console.log("something wrong:::", error);
      setIsError(error);
    };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(errors) === "{}") {
      const data = new FormData(event.currentTarget);
      const url = Endpoints.BASE_URL_USER + "/accountDetails/getBalance";////to be set
      const header = { "Content-Type": "application/json" };
      const sendData = {
        accNo: data.get("AccNo"),
        transactionPassword: data.get("tPassword")
      }

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      try {
        const resData = await axios.post(url, sendData, config);
        if (resData.status === 200) {
          console.log("finish api call - response:::", resData.data.balance);

        } else {
          console.log("API Call Failed");
        }
        setResponseData(resData);
        setIsModalOpen(true);
      } catch (error) {
        console.log("something wrong:::", error);
        console.log(sendData);
        setIsError(error);
      };
    }
  };

  const [accno, setAccNo] = useState("");
  const [responseData, setResponseData] = useState("");
  const [tPassword, setTPassword] = useState("");
  const [confirmTPassword, setConfirmTPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Regular expressions for validation
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!tPassword || !tPassword.match(passwordPattern)) {
      newErrors.tPassword =
        "Transaction password must be at least 8 characters, including alphabets, numbers, and special characters.";
    }

    if (tPassword !== confirmTPassword) {
      newErrors.confirmTPassword = "Transaction passwords do not match.";
    }

    if (!accno) {
      newErrors.accNo = "Account Number is required.";
    }

    setErrors(newErrors);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if(mssg === "Session Expired"){
      setMssg("");
      navigate("/");
    }
    setIsError("");
    setResponseData("");
  };
  
  const handleTPasswordChange = (e) => {
    setTPassword(e.target.value);
  };
  const handleConfirmTPasswordChange = (e) => {
    setConfirmTPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setAccNo(e.target.value);
  };

  const handleAccNoChange = (event) => {
    setAccNo(event.target.value);
    console.log(accno);
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
            Account Balance Check
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >{responseData &&
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Token Modal"
              margin="normal"
              fullWidth
              className="custom-modal"
            >
              <h3>Your current Account Balance is ₹{responseData.data.balance}</h3>
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"
                color="error">
                Account Number
              </InputLabel>
              <Select
                margin="normal"
                required
                fullWidth
                id="AccNo"
                label="Account Number"
                name="AccNo"
                autoComplete="Account Number"
                color="error"
                value={accno}
                autoFocus
                onChange={handleAccNoChange}
              >
                {accounts.map((row, i) => (
                  <MenuItem key={i} value={row}>{row}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="tPassword"
              label="Transaction Password"
              type="password"
              id="tPassword"
              autoComplete="current-password"
              color="error"
              value={tPassword}
              onChange={handleTPasswordChange}
              error = {!!errors.tPassword}
              helperText={errors.tPassword}
            />
            <TextField
                required
                fullWidth
                name="confirmTPassword"
                label=" Confirm Transaction Password"
                type="password"
                id="confirmTPassword"
                color="error"
                value={confirmTPassword}
                onChange={handleConfirmTPasswordChange}
                error={!!errors.confirmTPassword}
                helperText={errors.confirmTPassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              onClick={validateForm}
            >
              Submit
            </Button>

            {/* {error && (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}