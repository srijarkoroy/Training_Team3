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

const salt = bcrypt.genSaltSync(10);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function TransactionHistory() {
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const [showTransaction, setShowTransation] = useState(false)
  // useEffect(() => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/user/allTransactionDetails";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        accNo: data.get("accNo"),
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
        //   const token = resData.data.token;
        //   localStorage.setItem('token', token);
        } else {
          console.log("Authentication Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
        };
    }
  };
// });

  const [accNo, setAccNo] = useState("");
  const [transactionPassword, setPassword] = useState("");

  const handleAccNoChange = (e) => {
    setAccNo(e.target.value);
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
          <Avatar sx={{ m: 1, bgcolor: "#FFCD41" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              <Transaction data={res} />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
