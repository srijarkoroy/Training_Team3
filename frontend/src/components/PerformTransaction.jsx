import React, { useState } from "react";
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

const salt = bcrypt.genSaltSync(10);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function PerformTransaction() {
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/user/performTransaction";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        accNo: data.get("accNo"),
        recipientAccNo: data.get("recipientAccNo"),
        amount: data.get("amount"),
        statement: data.get("statement"),
        transactionPassword: data.get("password")

      };
      console.log(sendData);
      try {
        const resData = await axios.post(url, sendData, {headers : {'Authorization': 'Bearer ' + String(localStorage.getItem('token'))}});
        if(resData.status === 200) {
          console.log("finish api call - response:::", resData);
          setRes(resData);
          console.log("res passed:::", {res}.res.data);
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

  const [accNo, setAccNo] = useState("");
  const [recipientAccNo, setRecipientAccNo] = useState("");
  const [amount, setAmount] = useState("");
  const [statement, setStatement] = useState("");
  const [transactionPassword, setPassword] = useState("");

  const handleAccNoChange = (e) => {
    setAccNo(e.target.value);
  };

  const handleRecipientAccNoChange = (e) => {
    setRecipientAccNo(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStatementChange = (e) => {
    setStatement(e.target.value);
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
              id="recipientAccNo"
              label="Recipient Account Number"
              name="recipientAccNo"
              autoComplete="recipientAccNo"
              color="error"
              autoFocus
              value={recipientAccNo}
              onChange={handleRecipientAccNoChange}
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
              autoFocus
              value={amount}
              onChange={handleAmountChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="statement"
              label="Statement"
              name="statement"
              autoComplete="statement"
              color="error"
              autoFocus
              value={statement}
              onChange={handleStatementChange}
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
              Confirm Transaction
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