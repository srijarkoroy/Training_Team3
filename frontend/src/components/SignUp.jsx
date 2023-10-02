import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import bcrypt from "bcryptjs";
import React, { useState } from "react";
import Modal from "react-modal";

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
          userId: data.get("userId"),
          password: bcrypt.hashSync(data.get("password"), salt),
        },
        accNo: data.get("accNo"),
        transactionPassword: data.get("tPassword"),
      };
      console.log(sendData);
      try {
        const response = await fetch(url, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        });
        if(!response.ok) {
          throw new Error("Something wrong with request");
        }
        const resData = await response.json();
        setResponseData(resData);
        console.log("resData", responseData);
        console.log(responseData.userId);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
    }
    }
  };
  
  const [userId, setUserid] = useState("");
  const [responseData, setResponseData] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tPassword, setTPassword] = useState("");
  const [confirmTPassword, setConfirmTPassword] = useState("");
  const [accNo, setAccNo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserIdChange = (e) => {
    setUserid(e.target.value);
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

  const validateForm = () => {
    const newErrors = {};
    const userPattern = /^\d{5}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (userId && !userId.match(userPattern)) {
      newErrors.userId = "Invalid User Id";
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

    if (tPassword !== confirmTPassword) {
      newErrors.confirmTPassword = "Transaction passwords do not match.";
    }

    if (!accNo) {
      newErrors.accNo = "Account Number is required.";
    }

    setErrors(newErrors);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
          > { responseData &&
            <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Token Modal"
                margin="normal"
                fullWidth
                className="custom-modal"
              >
                <h2>Congratulations</h2>
                <h3>Your User ID is {responseData.userId}</h3>
                <button onClick={closeModal} color="red">Close</button>
              </Modal>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userId"
                  label="User Id"
                  name="userId"
                  color="error"
                  value={userId}
                  onChange={handleUserIdChange}
                  error={!!errors.userId}
                  helperText={errors.userId}
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
                <Link href="/#" variant="body2" color="error">
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
