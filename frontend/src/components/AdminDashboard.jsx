import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../styles/CardsStyle.css";
import axios from "axios"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import "../styles/ModalStyle.css";
import Endpoints from './Endpoints';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [mssg, setMssg] = useState("");

  const config = {
    headers:{
      Authorization: "Bearer "+localStorage.getItem("token")
    }
  };
  const adminCheck = async () => { 
    try{
      const ad = await axios.get(Endpoints.BASE_URL_ADMIN + '/adminCheck', config);
      console.log(ad);
      if(ad.data != true){
        navigate("/");
      } 
    } catch (error){
      setIsError(error);
    }
  }
  useEffect(() => {
    adminCheck();
  }, []);
  useEffect(() => {
    if(isError !== ""){
      console.log("inside use", isError);
      if(isError.response.status === 404){
        setMssg(isError.response.data);
      }else if(isError.response.data.status === 401){
        setMssg("Session Expired");
      } else{
        setMssg("Some error occured");
      }
      setIsModalOpen(true);
    }
  },[isError]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    if(mssg === "Session Expired"){
      setMssg("");
      navigate("/");
    }
    setIsError("");
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-between',
          flexWrap:'wrap',
          p: 1,
          m: 12,
          marginTop:20,
        //   marginRight: 10,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        {mssg &&
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Token Modal"
            margin="normal"
            fullWidth
            className="custom-modal"
          >
            <h3>{mssg}</h3>
            <button onClick={closeModal} color="red">Close</button>
          </Modal>}
    <Link to={"/usersearch"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image='https://static.thenounproject.com/png/642902-200.png'
          alt="user account"
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Search Users
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter User ID to search for user and enable/disable account
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to={"/admintransaction"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://cdn-icons-png.flaticon.com/512/9764/9764509.png"
          alt="transactions"
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Transaction History
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter Account Number to find the Transaction History for an account
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to={"/openaccount"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://icons.veryicon.com/png/o/miscellaneous/water-icon/account-opening-management-01.png"
          alt="fund transfer"
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Open Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter User Details to open a new bank account for a user
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </Box>
    </div>
  );
}