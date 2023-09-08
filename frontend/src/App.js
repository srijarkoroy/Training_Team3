import './App.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default App;
