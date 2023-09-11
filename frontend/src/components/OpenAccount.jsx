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

import Select from 'react-dropdown-select';
import 'react-dropdown/style.css';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OpenAccount() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = "http://localhost:8090/openacc";
    const header = { "Content-Type": "application/json" };
    const sendData = {
      email: data.get("email"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      aadhaar: data.get("aadhaar"),
      branch: data.get("branch"),
      ifsc: data.get("ifsc"),
      address: data.get("address"),
      accounttype: data.get("accounttype"),
    };
    console.log(sendData);

    await fetch(url,{
      method: 'post',
      headers: {'Content-Type':'application/json'}, body: JSON.stringify(sendData)}).then((response)=>{
          console.log('finish api call - response:::',response);
        }).catch((error)=>{
            console.log('something wrong:::',error);
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
  const [error, setError] = useState("");

  const namePattern = /^[A-Za-z]/;
  const aadhaarPattern = /^[0-9]{12,}/;
  const ifscPattern = /^[A-Z0-9]{10,}/;
  const addressPattern = /^[A-Za-z0-9,.]/;
  const emailPattern = /^([A-Za-z0-9])+@+([A-Za-z0-9])+.+([a-z])/;

  const options = [
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bengaluru', label: 'Bengaluru' },
  ];
  const accoptions = [
    { value: 'Savings', label: 'Savings' },
    { value: 'Current', label: 'Current' },
    { value: 'Salary', label: 'Salary' },
    { value: 'Fixed Deposit', label: 'Fixed Deposit' },
  ];
  const defaultOption = options[0];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!email.match(emailPattern)) {
      setError("Incorrect Email format");
    } else {
      setError("");
    }

  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);

    const namePattern = /^[A-Za-z ,.'-]+$/i;
    if (!firstname.match(namePattern)) {
      setError("First name can only contain alphabets");
    } else {
      setError("");
    }

  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);

    if (!lastname.match(namePattern)){
      setError("Last name can only contain alphabets");
    } else {
      setError("");
    }

  };

  const handleAadhaarChange = (e) => {
    setAadhaar(e.target.value);

    if (!aadhaar.match(aadhaarPattern)){
      setError("Aadhaar can only contain 12 digits");
    } else {
      setError("");
    }
  };

  const handleBranchChange = (e) => {
    setBranch(e[0].value);
    console.log("logsss",e[0].value);
    console.log("branch",branch);
    if (!branch){
      setError("Please select Branch");
    } else {
      setError("");
    }

  };


  const handleIfscChange = (e) => {
    setIfsc(e.target.value);

    if (!ifsc.match(ifscPattern)){
      setError("Incorrect IFSC, should be 10 characters");
    } else {
      setError("");
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);

    if (!address.match(addressPattern)){
      setError("Address should not contain special characters");
    } else {
      setError("");
    }
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e[0].value);
    console.log("log acc",e[0].value);
    console.log("type",accounttype);
    if (!accounttype){
      setError("Account Type can only contain alphabets");
    } else {
      setError("");
    }  
  }

  const handleOpenAccount = () => {
    if (error) {
      setError("An error occured");
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
            />
            {error && error.match("First") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}

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
            />
            {error && error.match("Last") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}

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
            />
            {error && error.match("Email") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}

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
            />
            {error && error.match("Aadhaar") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}

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
            />
            {error && error.match("Address") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
          
            <Select
              margin = "normal"
              options={options} 
              id = "branch"
              required
              name = "branch"
              label = "Branch"
              value={branch} 
              onChange={handleBranchChange} 
              placeholder="Select Branch" 
            />
            {error && error.match("Branch") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}

            
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
            />
            {error && error.match("IFSC") && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
            
            <Select
              margin = "normal"
              options={accoptions} 
              id = "accounttype"
              required
              name = "accounttype"
              label = "accounttype"
              value={accounttype} 
              onChange={handleAccountTypeChange} 
              placeholder="Select Account Type" 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              onClick={handleOpenAccount}
            >
              Submit
            </Button>

            {error && (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
