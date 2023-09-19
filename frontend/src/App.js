import './App.css';
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import OpenAccount from './components/OpenAccount'
import BalanceCheck from './components/BalanceCheck'
import TransactionHistory from './components/TransactionHistory'
import {Link, Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Transaction from './components/Transaction';
import PerformTransaction from './components/PerformTransaction';

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<div><Login /> <Navbar /> </div>} />
        <Route path="/openaccount" element={<div><OpenAccount /> <Navbar /> </div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/balancecheck" element={<BalanceCheck />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactionhistory" element={<div><TransactionHistory /> <Navbar /></div>}/>
        <Route path="/performtransaction" element={<div><PerformTransaction /><Navbar /></div>}/>
      </Routes>

    </div>
  );
}

export default App;
