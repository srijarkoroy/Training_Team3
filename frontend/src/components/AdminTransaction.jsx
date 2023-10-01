import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bcrypt from "bcryptjs";
import axios from "axios";
import Transaction from "./Transaction";
import Modal from "react-modal";
import "../styles/ModalStyle.css";
import { useNavigate } from "react-router-dom";
import Endpoints from "./Endpoints.js"

const salt = bcrypt.genSaltSync(10);


const defaultTheme = createTheme();

export default function AdminTransactionHistory() {
  const [isError, setIsError] = useState("");
  const [mssg, setMssg] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const [showTransaction, setShowTransation] = useState(false)
  const navigate = useNavigate();
  const config = {
    headers:{
      Authorization: "Bearer "+localStorage.getItem("token")
    }
  };
  const adminCheck = async () => { 
    try {
      const ad = await axios.get(Endpoints.BASE_URL_ADMIN + '/adminCheck', config);
      console.log(ad);
      if(ad.data != true){
        navigate("/");
      } 
    } catch(error){
      setIsError(error);
    }
  }
  useEffect(() => {
    adminCheck();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = Endpoints.BASE_URL_ADMIN + "/allTransactionDetails";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        accNo: data.get("accNo")
      };
      console.log(sendData);
      try {
        const resData = await axios.get(url+'/'+sendData.accNo, {headers : {'Authorization': 'Bearer ' + String(localStorage.getItem('token'))}});
        
        if(resData.status === 200) {
          console.log("finish api call - response:::", resData);
          setRes(resData);
          console.log("res passed:::", {res}.res.data);
          setAcc(sendData.accNo);
          setShowTransation(true);
        } else {
          console.log("Authentication Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
          setIsError(error);
        };
    }
  };
useEffect(() => {
  if(isError !== ""){
    console.log("inside use", isError);
     if(isError.response.status === 404){
      setMssg(isError.response.data);
    } else if(isError.response.data.status === 401){
      setMssg("Session Expired");
      setIsModalOpen(true);
    } else{
      setMssg("Some error occured");
    }
    setIsModalOpen(true);
  }
}, [isError])
  const [accNo, setAccNo] = useState("");
  const [acc, setAcc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    if(mssg === "Session Expired"){
      setMssg("");
      navigate("/");
    }
    setIsError("");
  };
  const handleAccNoChange = (e) => {
    setAccNo(e.target.value);
  };

  const handleLogin = () => {
    const accNoPattern = /^\d{10}$/;

    if (!accNo.match(accNoPattern)) {
      setError("Account Number should be 10-digits long.");
    } else {
      setError("");
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
          <Typography component="h1" variant="h5">
            Transaction History
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              onClick={handleLogin}
            >
              View Transaction History
            </Button>

            {error && (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
            {showTransaction && (
              <Transaction data={res} accNo={acc}/>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
