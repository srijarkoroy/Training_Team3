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
import bcrypt from "bcryptjs";
import axios from "axios";

const salt = bcrypt.genSaltSync(10);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UserSearch() {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/user/userDetails";
      const header = { "Content-Type": "application/json" };
      const sendData = {
        userId: data.get("username")
      };
      const config = {
        headers:{
          Authorization: "Bearer "+localStorage.getItem("token")
        }
      };
      console.log(sendData);
      try {
        const resData = await axios.get(url+'/'+sendData.userId,config);
        console.log("out:::",resData);
        if(resData.status === 200) {
          console.log("finish api call - response:::", resData);
          // const token = resData.data.token;
          // localStorage.setItem('token', token);
        } else {
          console.log("Login Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
        };
    }
  };

  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLogin = () => {
    const usernamePattern = /^[A-Za-z0-9]+$/;

    if (!username.match(usernamePattern)) {
      setError("Username can only contain alphabets and numbers.");
    }
      else {
      // setUsername("");
      // setPassword("");
      setError("");
    }
  };
  const handleToken = async() => {
    const tk = {authorization: localStorage.getItem('token')};
    try {
      const tkData = await axios.get("http://localhost:8090/user/userDetails/10013",
       {headers : {'Authorization': 'Bearer ' + String(localStorage.getItem('token'))}});
      if(tkData.status === 200) {
        console.log("finish api call - response:::", tkData);
        // const token = tkData.data.token;
        // localStorage.setItem('token', token);
      } else {
        console.log("Token get Failed");
      }
    } catch(error) {
        console.log("something wrong with token:::", error);
      };
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
            Search Users
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              color="error"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              onClick={handleLogin}
            >
              Search User
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}