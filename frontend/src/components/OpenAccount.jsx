import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import Select from "react-dropdown-select";
import "react-dropdown/style.css";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OpenAccount() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = "http://localhost:8090/user/accountDetails/createAccount";
    const header = { "Content-Type": "application/json" };
    const sendData = {
      // email: data.get("email"),
      // firstname: data.get("firstname"),
      // lastname: data.get("lastname"),
      aadhaarNo: data.get("aadhaar"),
      branch: data.get("branch"),
      IFSC: data.get("ifsc"),
      address: data.get("address"),
      accType: data.get("accounttype"),
    };
    console.log(sendData);

    await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((response) => {
        console.log("finish api call - response:::", response);
      })
      .catch((error) => {
        console.log("something wrong:::", error);
      });
  };

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [branch, setBranch] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [address, setAddress] = useState("");
  const [accounttype, setAccountType] = useState("");
  const [error, setError] = useState({});

  const namePattern = /^[A-Za-z ,.'-]+$/i;
  const aadhaarPattern = /^\d{12}$/;
  const ifscPattern = /^[A-Z0-9]{10,}/;
  const addressPattern = /^[A-Za-z0-9,.]/;
  const emailPattern = /^([A-Za-z0-9])+@+([A-Za-z0-9])+.+([a-z])/;

  const options = [
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bengaluru", label: "Bengaluru" },
  ];
  const accoptions = [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
    { value: "Salary", label: "Salary" },
    { value: "Fixed Deposit", label: "Fixed Deposit" },
  ];
  const defaultOption = options[0];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);

    const namePattern = /^[A-Za-z ,.'-]+$/i;
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleAadhaarChange = (e) => {
    setAadhaar(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e[0].value);
    // console.log("logsss", e[0].value);
    // console.log("branch", branch);
  };

  const handleIfscChange = (e) => {
    setIfsc(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const validateForm = () => {
    const newError = {};

    if (!address.match(addressPattern)) {
      newError.address = "Invalid";
    }

    if (!ifsc.match(ifscPattern)) {
      newError.ifsc = "Invalid";
    }

    if (!branch) {
      newError.branch = "Invalid";
    }
    if (!aadhaar.match(aadhaarPattern)) {
      newError.aadhaar = "Invalid";
    }

    if (!lastname.match(namePattern)) {
      newError.lastName = "Invalid";
    }

    if (!firstname.match(namePattern)) {
      newError.firstName = "Invalid";
    }

    if (!email.match(emailPattern)) {
      newError.email = "Valid email is required.";
      // console.log(newError);
    }

    if (!accounttype) {
      newError.actype = "Invalid";
    }

    setError(newError);
    // console.log(newError);
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e[0].value);
    // console.log("log acc", e[0].value);
    // console.log("type", accounttype);
  };

  // const handleOpenAccount = () => {
  //   validateForm();
  //   if (error) {
  //     setError("An error occured");
  //   } else {
  //     setError({});
  //   }
  // };

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
            Open Account
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
              id="firstname"
              label="Firstname"
              name="firstname"
              autoComplete="firstname"
              color="error"
              autoFocus
              value={firstname}
              onChange={handleFirstnameChange}
              error={!!error.firstName}
              helperText={error.firstName}
            />
            {/* {error && error.match("First") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Lastname"
              name="lastname"
              autoComplete="lastname"
              color="error"
              value={lastname}
              onChange={handleLastnameChange}
              error={!!error.lastName}
              helperText={error.lastName}
            />
            {/* {error && error.match("Last") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              color="error"
              value={email}
              onChange={handleEmailChange}
              error={!!error.email}
              helperText={error.email}
            />
            {/* {error && error.match("Email") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="aadhaar"
              label="Aadhaar"
              name="aadhaar"
              autoComplete="aadhaar"
              color="error"
              value={aadhaar}
              onChange={handleAadhaarChange}
              error={!!error.aadhaar}
              helperText={error.aadhaar}
            />
            {/* {error && error.match("Aadhaar") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              color="error"
              value={address}
              onChange={handleAddressChange}
              error={!!error.address}
              helperText={error.address}
            />
            {/* {error && error.match("Address") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <Select
              margin="normal"
              options={options}
              id="branch"
              required
              name="branch"
              label="Branch"
              value={branch}
              onChange={handleBranchChange}
              placeholder="Select Branch"
              error={!!error.branch}
              helperText={error.branch}
            />
            {/* {error && error.match("Branch") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="ifsc"
              label="IFSC"
              name="ifsc"
              autoComplete="ifsc"
              color="error"
              value={ifsc}
              onChange={handleIfscChange}
              error={!!error.ifsc}
              helperText={error.ifsc}
            />
            {/* {error && error.match("IFSC") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )} */}

            <Select
              margin="normal"
              options={accoptions}
              id="accounttype"
              required
              name="accounttype"
              label="accounttype"
              value={accounttype}
              onChange={handleAccountTypeChange}
              placeholder="Select Account Type"
              error={!!error.actype}
              helperText={error.actype}
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
