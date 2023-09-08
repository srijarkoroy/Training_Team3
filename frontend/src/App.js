import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import {Link, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div><Login /> <Navbar /> </div>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default App;
