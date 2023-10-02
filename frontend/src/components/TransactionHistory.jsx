import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import bcrypt from "bcryptjs";
import Transaction from "./Transaction";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Modal from "react-modal";
import "../styles/ModalStyle.css";
import {useNavigate} from "react-router-dom";
import Endpoints from "./Endpoints.js"
const salt = bcrypt.genSaltSync(10);


const defaultTheme = createTheme();

export default function TransactionHistory() {
  const [isError, setIsError] = useState("");
  const [mssg, setMssg] = useState("");
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
  }, []);

  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const [acc, setAcc] = useState("");
  const [showTransaction, setShowTransation] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = Endpoints.BASE_URL_USER + "/allTransactionDetails";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        accNo: data.get("AccNo"),
        transactionPassword: data.get("password"),
      };
      console.log(sendData);
      try {
        const resData = await axios.post(url, sendData, {headers : {'Authorization': 'Bearer ' + String(localStorage.getItem('token'))}});
        
        if(resData.status === 200) {
          console.log("finish api call - response:::", resData);
          setRes(resData);
          console.log("res passed:::", {res}.res.data);
          setShowTransation(true);
          setAcc(sendData.accNo);
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
    handleAccounts();
  }, []);
  useEffect(() => {
    if(isError !== ""){
      console.log("inside use", isError);
      if(isError.response.status === 404){
        setMssg(isError.response.data);
      } else if(isError.response.data.status === 401){
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

  const [accno, setAccNo] = useState("");
  const [transactionPassword, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    if(mssg === "Session Expired"){
      setMssg("");
      navigate("/");
    }
    setIsError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleAccNoChange = (event) => {
    setAccNo(event.target.value);
  };

  const handleLogin = () => {
    const transactionPasswordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!transactionPassword.match(transactionPasswordPattern)) {
      setError(
        "Password must be at least 8 characters long and contain alphabets, numbers, and special symbols."
      );
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
          <Typography component="h1" variant="h5">
            Transaction History
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="error"
              value={transactionPassword}
              onChange={handlePasswordChange}
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
              <Transaction data={res} accNo={acc} />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
