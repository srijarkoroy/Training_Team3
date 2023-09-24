import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bcrypt from "bcryptjs";
import axios from "axios";
import {Link} from "react-router-dom";
import Transaction from "./Transaction";
import Modal from "react-modal";
import "../styles/ModalStyle.css";

const salt = bcrypt.genSaltSync(10);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminTransactionHistory() {
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const [showTransaction, setShowTransation] = useState(false)
  // useEffect(() => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/admin/allTransactionDetails";
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
          setShowTransation(true);
        //   const token = resData.data.token;
        //   localStorage.setItem('token', token);
        } else {
          console.log("Authentication Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
          setIsError(error.response.data);
          setIsModalOpen(true);
        };
    }
  };
// });

  const [accNo, setAccNo] = useState("");
  const [isError, setIsError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
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
          {isError &&
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Token Modal"
              margin="normal"
              fullWidth
              className="custom-modal"
            >
              <h3>{isError}</h3>
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
              <Transaction data={res} />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
