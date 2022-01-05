import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom'
import { FirebaseContext, AuthContext } from '../../store/Context'
import logo from '../../assets/logo.png';
import homeicon from '../../assets/homeicon.png';

const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date()
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.storage().ref(`/images/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        firebase.firestore().collection('events').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })
  }
  return (
    <div className="loginModal">
      {/* <Header /> */}
      <form onSubmit={handleSubmit}>
        <div><a href='' onClick={() => history.push('/')}><img src={homeicon} /></a></div>
        <div class="imgcontainer">
          <img src={logo} alt="Avatar" class="avatar" />
        </div>

        <div class="container">
          <label for="uname"><b>Event Name</b></label>
          <input type="text" value={name} onChange={(e)=>{setName(e.target.value);}} placeholder="Enter Event Name" name="uname" required />

          <label for="uname"><b>Category</b></label>
          <select class="form-select"  value={category} onChange={(e)=>{setCategory(e.target.value);}} aria-label="Default select example">
            <option selected>Select Category</option>
            <option value="Business">Business</option>
            <option value="Parties">Parties</option>
            <option value="Sports">Sports</option>
            <option value="Festivals">Festivals</option>
          </select>

          <label for="psw"><b>Ticket Price</b></label>
          <input type="text"  value={price} onChange={(e)=>{setPrice(e.target.value);}} placeholder="Enter Ticket Price/Free" name="psw" required/>
          {image ?<img width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}/>
          : <img alt="" src=""/>}
          <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
          <button type="submit" className="loginBtnModal">Create Event</button>

        </div>
      </form>
    </div>
  );
};

export default Create;