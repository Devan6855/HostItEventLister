import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import emailjs from 'emailjs-com';
import './View.css';
import { useHistory } from 'react-router';

function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)
  const [sellerEmail, setSellerEmail] = useState("")

  const history = useHistory()

  useEffect(() => {
    const { userId } = postDetails
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  }, [])

  useEffect(()=>{
    setSellerEmail(postDetails.email)
    console.log("sellerEmail")
    console.log(sellerEmail)
  },[])

console.log(postDetails)

const handleSubmitForm =(e)=>{
  e.preventDefault();
  emailjs.sendForm('service_wkj6o1q', 'template_v8p1epj', e.target, 'user_V8KI889KpV4AgaytRZW18').then(()=>{
    history.push("/")
  }).catch((error) => {
    alert(error.text);
});
}

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <h4>Seller Details</h4>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
        <form className="contact-form emailForm" onSubmit={handleSubmitForm}>
          <h3>Connect with Seller</h3>
      <input type="hidden" value={sellerEmail} name="demo" />
      <label>Name</label><br />
      <input type="text" name="name" /><br />
      <label>Number</label><br />
      <input type="text" name="number" />
      <input type="submit" className="msgBtn btn btn-primary" value="Send Message" />
    </form>
      </div>
    </div>
  );
}
export default View;