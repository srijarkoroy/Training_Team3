import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function BalanceCheck() {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error === "") {
      const data = new FormData(event.currentTarget);
      const url = "http://localhost:8090/user/accountDetails/getBalance";
      const header = { "Content-Type": "application/json" };
      const accNo= data.get("AccNo");
      const password= data.get("password");
      const config = {
        headers:{
          Authorization: "Bearer "+localStorage.getItem("token")
        }
      };
      // console.log(sendData);
      try {
        const resData = await axios.get(url+"/"+accNo,config);
        if(resData.status === 200) {
          console.log("finish api call - response:::", resData.data);
          // const token = resData.data.token;
          // localStorage.setItem('token', token);
        } else {
          console.log("API Call Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
        };
    }
  };

  const [accno, setAccNo] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setAccNo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleBalanceCheck = () => {
  //   const usernamePattern = /^[A-Za-z0-9]+$/;
  //   const passwordPattern =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  //   if (!username.match(usernamePattern)) {
  //     setError("Username can only contain alphabets and numbers.");
  //   } else if (!password.match(passwordPattern)) {
  //     setError(
  //       "Password must be at least 8 characters long and contain alphabets, numbers, and special symbols."
  //     );
  //   } else {
  //     // setUsername("");
  //     // setPassword("");
  //     setError("");
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
              id="AccNo"
              label="Account Number"
              name="AccNo"
              autoComplete="Account Number"
              color="error"
              autoFocus
              value={accno}
              onChange={handleUsernameChange}
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
              value={password}
              onChange={handlePasswordChange}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              // onClick={handleBalanceCheck}
            >
              Check Balance
            </Button>

            {error && (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
            {/* <Grid container>
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
