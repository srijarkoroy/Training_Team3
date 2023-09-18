// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import { Link } from 'react-router-dom';
// import "../styles/CardsStyle.css";
// import { flexbox, grid } from '@mui/system';


// const defaultTheme = createTheme();

// export default function Dashboard() {
//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         flexWrap: 'wrap',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}
//                 >
//                     <Link to="/balancecheck" style={{ textDecoration: "none" }}>
//                         <Card className='custom-card'>
//                             <CardActionArea>
//                                 {/* <CardMedia
//         //   component="img"
//         //   height="140"
//         //   image="/static/images/cards/contemplative-reptile.jpg"
//         //   alt="green iguana"
//         /> */}
//                                 <AccountBalanceIcon />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="div">
//                                         Check Account Balance
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Enter your Account Number and Transaction pin to instantly check you account balance
//                                     </Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                         </Card>
//                     </Link>
//                     <Link to="/balancecheck" style={{ textDecoration: "none" }}>
//                         <Card className='custom-card'>
//                             <CardActionArea>
//                                 {/* <CardMedia
//         //   component="img"
//         //   height="140"
//         //   image="/static/images/cards/contemplative-reptile.jpg"
//         //   alt="green iguana"
//         /> */}
//                                 <AccountBalanceIcon />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="div">
//                                         Check Account Balance
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Enter your Account Number and Transaction pin to instantly check you account balance
//                                     </Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                         </Card>
//                     </Link>
//                     <Link to="/balancecheck" style={{ textDecoration: "none" }}>
//                         <Card className='custom-card'>
//                             <CardActionArea>
//                                 {/* <CardMedia
//         //   component="img"
//         //   height="140"
//         //   image="/static/images/cards/contemplative-reptile.jpg"
//         //   alt="green iguana"
//         /> */}
//                                 <AccountBalanceIcon />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="div">
//                                         Check Account Balance
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Enter your Account Number and Transaction pin to instantly check you account balance
//                                     </Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                         </Card>
//                     </Link>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// }


import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../styles/CardsStyle.css";
import { Link } from 'react-router-dom';

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

export default function FlexDirection() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap:'wrap',
          p: 1,
          m: 12,
          marginTop:20,
        //   marginRight: 10,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
    <Link to={"/balancecheck"} style={{textDecoration:"none"}}>
    <Card 
    className='custom-card'>
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
            Check Account Balance
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter Account Number and Transaction Pin to instantly check your account balance
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Card
    className='custom-card'>
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
    <Card 
    className='custom-card'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://previews.123rf.com/images/khalide91/khalide911912/khalide91191200363/136621325-bank-to-bank-money-transfer-icon.jpg"
          alt="fund transfer"
          sx={{objectFit: "contain" }}
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
      </Box>
    </div>
  );
}