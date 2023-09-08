import '../styles/Login.css'

function SignUp() {
    return (
      <div className="SignUp">
        <h1>Sign Up!</h1>
        <input type="text" placeholder="Account No." maxLength={10}></input>
        <input type="password" placeholder="Password"></input>
      </div>
    );
  }
  
  export default SignUp;