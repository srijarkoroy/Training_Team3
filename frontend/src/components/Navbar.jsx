import { Box, Typography } from "@mui/material";
import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const confi = {
    headers:{
      Authorization: "Bearer "+localStorage.getItem("token")
    }
  };
  const userCheck = async () => { 
    const ad = await axios.get('http://localhost:8090/admin/adminCheck', confi);
    console.log(ad);
    if(ad.data === false){
      navigate("/dashboard");
    } else if(ad.data === true){
      navigate("/admindashboard");
    } else {
      navigate("/");
    }
  }
  const handleClick = () => {
    userCheck();
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
          <IconButton
            data-testid="menubtn"
            sx={{
              color: "white",
              m: 1,
              mt: 1.5,
              mb: 1.5,
            }}
          >
            <MenuIcon />
          </IconButton>

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
