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
import bcrypt from "bcryptjs";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const salt = bcrypt.genSaltSync(10);

export default function SignUp() {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(errors) === "{}") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/user/userDetails/createUser";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        user: {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          password: bcrypt.hashSync(data.get("password"), salt),
          phone: data.get("phoneNumber"),
        },
        accNo: data.get("accNo"),
        transactionPassword: data.get("tPassword"),
      };
      console.log(sendData);
      await axios
        .post(url, sendData)
        .then((response) => {
          console.log("finish api call - response:::", response);
        })
        .catch((error) => {
          console.log("something wrong:::", error);
        });
    }
  };

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tPassword, setTPassword] = useState("");
  const [confirmTPassword, setConfirmTPassword] = useState("");
  const [accNo, setAccNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleTPasswordChange = (e) => {
    setTPassword(e.target.value);
  };
  const handleConfirmTPasswordChange = (e) => {
    setConfirmTPassword(e.target.value);
  };
  const handleAccNoChange = (e) => {
    setAccNo(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    // Regular expressions for validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email || !email.match(emailPattern)) {
      newErrors.email = "Valid email is required.";
    }

    if (!password || !password.match(passwordPattern)) {
      newErrors.password =
        "Password must be at least 8 characters, including alphabets, numbers, and special characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!tPassword || !tPassword.match(passwordPattern)) {
      newErrors.tPassword =
        "Transaction password must be at least 8 characters, including alphabets, numbers, and special characters.";
    }
    if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (tPassword !== confirmTPassword) {
      newErrors.confirmTPassword = "Transaction passwords do not match.";
    }

    if (!accNo) {
      newErrors.accNo = "Account Number is required.";
    }

    setErrors(newErrors);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#FFCD41" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color="error"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  color="error"
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  color="error"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  color="error"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="accNo"
                  label="Account Number"
                  name="accNo"
                  color="error"
                  value={accNo}
                  onChange={handleAccNoChange}
                  error={!!errors.accNo}
                  helperText={errors.accNo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  color="error"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  color="error"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="tPassword"
                  label="Transaction Password"
                  type="password"
                  id="tPassword"
                  color="error"
                  value={tPassword}
                  onChange={handleTPasswordChange}
                  error={!!errors.tPassword}
                  helperText={errors.tPassword}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick={validateForm}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
