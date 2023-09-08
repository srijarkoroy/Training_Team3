import '../styles/Login.css'
import {Link} from 'react-router-dom'

function Login() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <input type="text" placeholder="User ID" maxLength={8}></input>
        <input type="password" placeholder="Password"></input>
        <div className="">
            <h4>Don't have an account yet?</h4>
            <Link to="/signup" >Sign Up!</Link>
        </div>
      </div>
    );
  }
  
  export default Login;