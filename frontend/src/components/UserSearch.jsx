import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import bcrypt from "bcryptjs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import Modal from "react-modal";
import "../styles/ModalStyle.css";

const salt = bcrypt.genSaltSync(10);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UserSearch() {
  const [error, setError] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [res, setRes] = useState("");
  const navigate = useNavigate();

  const config = {
    headers:{
      Authorization: "Bearer "+localStorage.getItem("token")
    }
  };
  const adminCheck = async () => { 
    const ad = await axios.get('http://localhost:8090/admin/adminCheck', config);
    console.log(ad);
    if(ad.data != true){
      navigate("/");
    } 
  }
  useEffect(() => {
    adminCheck();
  }, []);

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
          setRes(resData);
          console.log("res passed:::", {res}.res.data);
          setShowUsers(true);
          // const token = resData.data.token;
          // localStorage.setItem('token', token);
        } else {
          console.log("Login Failed");
        }
      } catch(error) {
          console.log("something wrong:::", error);
          setIsError(error.response.data);
          setIsModalOpen(true);
        };
    }
  };

  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsError("");
  };
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
            {error && (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", margin: "2% 0" }}
              >
                {error}
              </Typography>
            )}
            {showUsers && (
              <Users data={res} />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
