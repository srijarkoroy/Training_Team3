import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";


import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Select from "react-dropdown-select";
import "react-dropdown/style.css";
import Modal from "react-modal";
import "../styles/ModalStyle.css";
import Endpoints from "./Endpoints";

const defaultTheme = createTheme();
Modal.setAppElement('#root');
export default function OpenAccount() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = Endpoints.BASE_URL_USER+"/accountDetails/createAccount";
    const header = { "Content-Type": "application/json" };
    
    const sendData = {
      firstName: data.get("firstname"),
      lastName: data.get("lastname"),
      email: data.get("email"),
      phone: data.get("phone"),
      userId: data.get("userid"),
      aadhaarNo: data.get("aadhaar"),
      branch: data.get("branch"),
      ifsc: data.get("ifsc"),
      address: data.get("address"),
      accType: data.get("accounttype"),
    };
    console.log(sendData);
    console.log(error);
    if(JSON.stringify(error) === "{}"){
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
        console.log(responseData);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };
  const [responseData, setResponseData] = useState("");
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [address, setAddress] = useState("");
  const [accounttype, setAccountType] = useState("");
  const [error, setError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userPattern = /^\d{5}$/;
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

  const handleUseridChange = (e) => {
    setUserid(e.target.value);
  };

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

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e[0].value);
  };

  const handleIfscChange = (e) => {
    setIfsc(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const validateForm = () => {
    const newError = {};

    if (userid && !userid.match(userPattern)) {
      newError.userId = "Invalid";
    }

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
    }

    if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
      newError.phoneNumber = "Invalid phone number";
    }

    if (!accounttype) {
      newError.actype = "Invalid";
    }

    setError(newError);
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e[0].value);
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
            {responseData && 
              <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Token Modal"
                margin="normal"
                fullWidth
                className="custom-modal"
              >
                <h2>Congratulations</h2>
                <h3>Your Account No is {responseData.accNo}</h3>
                <button onClick={closeModal} color="red">Close</button>
              </Modal>
            }

            <TextField
              margin="normal"
              fullWidth
              id="userid"
              label="User Id"
              name="userid"
              autoComplete="userid"
              autoFocus
              color="error"
              value={userid}
              onChange={handleUseridChange}
              error={!!error.userId}
              helperText={error.userId}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Firstname"
              name="firstname"
              autoComplete="firstname"
              color="error"
              value={firstname}
              onChange={handleFirstnameChange}
              error={!!error.firstName}
              helperText={error.firstName}
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
              value={lastname}
              onChange={handleLastnameChange}
              error={!!error.lastName}
              helperText={error.lastName}
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
              value={email}
              onChange={handleEmailChange}
              error={!!error.email}
              helperText={error.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="phone"
              color="error"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={!!error.phoneNumber}
              helperText={error.phoneNumber}
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
              value={aadhaar}
              onChange={handleAadhaarChange}
              error={!!error.aadhaar}
              helperText={error.aadhaar}
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
              value={address}
              onChange={handleAddressChange}
              error={!!error.address}
              helperText={error.address}
            />

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

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
