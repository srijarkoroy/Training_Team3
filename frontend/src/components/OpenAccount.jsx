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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OpenAccount() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = "http://localhost:8090/openacc";
    const header = { 'Content-Type': 'application/json' };
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
    await axios.post(url, (sendData)).then((response)=>{
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleAadhaarChange = (e) => {
    setAadhaar(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleIfscChange = (e) => {
    setIfsc(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  }

  const handleOpenAccount = () => {
    const namePattern = /^[A-Za-z]/;
    const aadhaarPattern = /^[0-9]{12,}/;
    const ifscPattern = /^[A-Z0-9]{10,}/;
    const addressPattern = /^[A-Za-z0-9,.]/
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailPattern = /^([A-Za-z0-9])+@+([A-Za-z])+.+([a-z])/;
    if (!firstname.match(namePattern)) {
      setError("First name can only contain alphabets");
    } else if (!lastname.match(namePattern)){
        setError("Last name can only contain alphabets");
    } else if (!aadhaar.match(aadhaarPattern)){
        setError("Aadhaar can only contain numbers");
    } else if (!branch.match(namePattern)){
        setError("Branch name can only contain alphabets");
    } else if (!ifsc.match(ifscPattern)){
        setError("Incorrect IFSC, should be 10 characters");
    } else if (!address.match(addressPattern)){
        setError("Address should not contain special characters");
    } else if (!accounttype.match(namePattern)){
        setError("Account Type can only contain alphabets");
    } 
    else if (!email.match(emailPattern)) {
      setError(
        "Email must containt @ and ."
      );
    } else {
      setFirstname("");
      setLastname("");
      setAadhaar("");
      setBranch("");
      setIfsc("");
      setAddress("");
      setEmail("");
      setAccountType("");
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Lastname"
              name="lastname"
              autoComplete="lastname"
              color="error"
              autoFocus
              value={lastname}
              onChange={handleLastnameChange}
            />
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
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="aadhaar"
              label="Aadhaar"
              name="aadhaar"
              autoComplete="aadhaar"
              color="error"
              autoFocus
              value={aadhaar}
              onChange={handleAadhaarChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              color="error"
              autoFocus
              value={address}
              onChange={handleAddressChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="branch"
              label="Branch"
              id="branch"
              autoComplete="branch"
              color="error"
              value={branch}
              onChange={handleBranchChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ifsc"
              label="IFSC"
              name="ifsc"
              autoComplete="ifsc"
              color="error"
              autoFocus
              value={ifsc}
              onChange={handleIfscChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="accounttype"
              label="Account Type"
              name="accounttype"
              autoComplete="type"
              color="error"
              autoFocus
              value={accounttype}
              onChange={handleAccountTypeChange}
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
