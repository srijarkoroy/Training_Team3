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
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <Link to={"/usersearch"} style={{textDecoration:"none"}}>
    <Card className='custom-card'>
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
    <Link to={"/transactionhistory"} style={{textDecoration:"none"}}>
    <Card className='custom-card'>
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
    <Card className='custom-card'>
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