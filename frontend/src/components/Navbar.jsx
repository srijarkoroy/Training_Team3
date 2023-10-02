import { Box, Typography } from "@mui/material";
import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Endpoints from "./Endpoints.js"

const Navbar = () => {
  const navigate = useNavigate();
  const confi = {
    headers:{
      Authorization: "Bearer "+localStorage.getItem("token")
    }
  };
  const userCheck = async () => { 
    try {
    const ad = await axios.get(Endpoints.BASE_URL_ADMIN + '/adminCheck', confi);
    console.log(ad);
    if(ad.data === false){
      navigate("/dashboard");
    } else if(ad.data === true){
      navigate("/admindashboard");
    } else {
      navigate("/");
    }
    } catch(error){
      navigate("/");
    }
  }
  const handleClick = () => {
    userCheck();
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }
  return (
    <Box
      id="navbar-container"
      sx={{
        width: "100%",
        position: "fixed",
        top: "0%",
        left: "0%",
        zIndex: "1",
      }}
    >
      <Box
        id="navbar"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "70px",
        }}
      >
        <Box
          id="contents"
          sx={{
            flex: 1,
            display: "flex",
            backgroundColor: "#d71e28",
          }}
        >
        
          <Box
            id="brand-holder"
            sx={{
              flex: 1,
              ml: 1,
              display: "flex",
              alignItems: "center",

              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleClick}
          >
            <Typography color={"white"} fontSize={24} fontWeight={600}>
              Online Bank T3
            </Typography>
          </Box>
          <IconButton
            data-testid="menubtn"
            sx={{
              color: "white",
              m: 1,
              mt: 1.5,
              mb: 1.5,
            }}
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Box>
        <Box
          id="yellow-strip"
          sx={{
            width: "100%",
            height: "4px",
            float: "flex-end",
            backgroundColor: "#FFCD41",
          }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
