import './App.css';
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import OpenAccount from './components/OpenAccount'
import BalanceCheck from './components/BalanceCheck'
import {Link, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<div><Login /> <Navbar /> </div>} />
        <Route path="/openaccount" element={<div><OpenAccount /> <Navbar /> </div>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/balancecheck" element={<BalanceCheck />} />
      </Routes>

    </div>
  );
}

export default App;
