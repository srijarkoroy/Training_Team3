import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import AdminTransactionHistory from './components/AdminTransaction';
import BalanceCheck from './components/BalanceCheck';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import OpenAccount from './components/OpenAccount';
import PerformTransaction from './components/PerformTransaction';
import SignUp from './components/SignUp';
import TransactionHistory from './components/TransactionHistory';
import UserSearch from './components/UserSearch';
import Withdraw from './components/Withdraw';

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<div><Login /> </div>} />
        <Route path="/openaccount" element={<div><OpenAccount /> <Navbar /> </div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/balancecheck" element={<BalanceCheck />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/transactionhistory" element={<div><TransactionHistory /> <Navbar /></div>}/>
        <Route path="/performtransaction" element={<div><PerformTransaction /><Navbar /></div>}/>
        <Route path="/withdraw" element={<div><Withdraw /><Navbar /></div>}/>
        <Route path="/admintransaction" element={<div><AdminTransactionHistory /><Navbar /></div>}/>
        <Route path="/usersearch" element={<div><UserSearch /><Navbar /></div>}/>
      </Routes>

    </div>
  );
}

export default App;
