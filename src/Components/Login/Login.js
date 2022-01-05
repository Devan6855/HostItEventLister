import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context'


//import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom'
import logo from '../../assets/logo.png';
import homeicon from '../../assets/homeicon.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState('');
  const { firebase } = useContext(FirebaseContext)
  const history = useHistory()
  const handleLogin = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      history.push('/')
    }).catch((error) => {
      setErrors(error.message)
    })
  }



  return (
    <div className="loginModal">
      <form onSubmit={handleLogin}>
        <div><a href='' onClick={() => history.push('/')}><img src={homeicon} /></a></div>
        <div class="imgcontainer">
          <img src={logo} alt="logo" class="avatar" />
        </div>

        <div class="container">
          <label for="uname"><b>Email</b></label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="uname" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} name="psw" required />
          <div class='signInError'>{errors}</div>

          <button type="submit" className="loginBtnModal">Login</button>
          <div>Dont have an account? <a href='' class="link-primary" onClick={() => history.push('/signup')}>Signup</a></div>

        </div>
      </form>
    </div>
  );
}

export default Login;