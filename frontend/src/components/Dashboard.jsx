import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/CardsStyleAdmin.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import Modal from "react-modal";
import "../styles/ModalStyle.css";
import Endpoints from "./Endpoints.js"

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

export default function Dashboard() {
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
      if(ad.data != false){
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
          justifyContent:'space-evenly',
          flexWrap:'wrap',
          p: 1,
          m: 12,
          marginTop:12,
        //   marginRight:10,
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
    <Link to={"/balancecheck"} style={{textDecoration:"none"}}>
    <Card 
    className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image='https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-balance_90300.png'
          alt="acc balance"
          sx={{objectFit: "contain" }}

        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Check Balance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter Account Number and Transaction Pin to instantly check your account balance
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to={"/transactionhistory"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://cdn-icons-png.flaticon.com/512/2761/2761001.png"
          alt="transactions"
          sx={{objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Transaction History
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter Account Number and Transaction Pin to instantly check your Transaction History
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to={"/performtransaction"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://previews.123rf.com/images/khalide91/khalide911912/khalide91191200363/136621325-bank-to-bank-money-transfer-icon.jpg"
          alt="fund transfer"
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Fund Transfer
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter Account Number and Transaction Pin to instantly transfer money
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to={"/withdraw"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://cdn-icons-png.flaticon.com/512/1682/1682308.png"
          alt="withdraw funds"
          sx={{objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Withdraw Funds
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter Account Number and Transaction Pin to instantly withdraw money
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
          image="https://static.thenounproject.com/png/3104881-200.png"
          alt="open accounts"
          sx={{objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Open Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Enter Account Number and Transaction Pin to instantly withdraw money
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to={"/changepassword"} style={{textDecoration:"none"}}>
    <Card className='custom-card' sx={{marginTop:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfsJYTg1XAunLg_XaXRNVP1t8wugRh7hUkQ&usqp=CAU"
          alt="change transaction password"
          sx={{objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Change Transaction Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select to change transaction password for any of your bank accounts
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </Box>
    </div>
  );
}