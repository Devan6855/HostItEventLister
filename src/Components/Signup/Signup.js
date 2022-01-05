import React, { useState, useContext } from 'react';
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './Signup.css';
import logo from '../../assets/logo.png';
import homeicon from '../../assets/homeicon.png';



export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState({});

  const { firebase } = useContext(FirebaseContext);
  const isValid = () => {
    const rePass = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$");
    const isOkPass = rePass.test(password);
    const reNum = new RegExp("^\d{10}$");
    const isOkNum = reNum.test(phone);
    const reEmail = new RegExp("/^[_a-zA-Z0-9._%+-]+(\.[_a-zA-Z0-9.-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-z]{2,6})$/");
    const isOkEmail = reEmail.test(email);

    let valid = true,
      errors = {};
    
    if (!isOkEmail) {
      valid = false;
      errors.email = 'Please enter a valid email address.';
    }
    if (!isOkNum) {
      valid = false;
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!isOkPass) {
      valid = false;
      errors.password = 'The password must conatin Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
    }

    setError(errors);

    return valid;

}

const handleSubmit = (e) => {
  e.preventDefault()
  if (isValid()){
  firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
    result.user.updateProfile({ displayName: username }).then(() => {
      firebase.firestore().collection('users').add({
        id: result.user.uid,
        username: username,
        phone: phone

      }).then(() => {
        history.push("/login")
      })
    })

  })
}
}

return (
  <div className="loginModal">
    <form onSubmit={handleSubmit}>
      <div><a href='' onClick={() => history.push('/')}><img src={homeicon} /></a></div>
      <div class="imgcontainer">
        <img src={logo} alt="Avatar" class="avatar" />
      </div>

      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} name="uname" required />
        <div class='validationError'>{error.username}</div>

        <label for="uname"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} name="uname" required />
        <div class='validationError'>{error.email}</div>

        <label for="uname"><b>Phone</b></label>
        <input type="text" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} name="uname" required />
        <div class='validationError'>{error.phone}</div>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} name="psw" required />
        <div class='validationError'>{error.password}</div>
        <button type="submit" className="loginBtnModal">Sign Up</button>
        <div>Already have an account? <a href='' class="link-primary" onClick={() => history.push('/login')}>Login</a></div>

      </div>
    </form>
  </div>
);
}