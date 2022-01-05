import React, { Fragment, useState } from 'react';
import './Edit.css';
import {PostContext} from "../../store/PostContext";
import {FirebaseContext} from "../../store/Context";
import {AuthContext} from "../../store/Context";
import { useContext } from 'react';
import { useHistory } from 'react-router';

const Edit = () => {

    const {postDetails} = useContext(PostContext)
    const {firebase} = useContext(FirebaseContext)
    const {user} = useContext(AuthContext)

    const [name, setName] = useState(postDetails.name)
    const [category, setCategory] = useState(postDetails.category)
    const [price, setPrice] = useState(postDetails.price)
    const [image, setImage] = useState(null)

    const date = new Date()

    const history = useHistory()

    const handleEdit=(e)=>{
        e.preventDefault();
        if(image){
            firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
                ref.getDownloadURL().then((url)=>{
                  console.log(url)
                  firebase.firestore().collection('products').doc(postDetails.id).set({
                    name,
                    category,
                    price,
                    url,
                    userId:user.uid,
                    createdAt:date.toDateString()
                  }).then(()=>{

                      history.push('/')
                      window.location.reload()
                  })
                })
              })
        }else{
            firebase.firestore().collection('products').doc(postDetails.id).set({
                name,
                category,
                price,
                url:postDetails.url,
                userId:user.uid,
                createdAt:date.toDateString()
              }).then(()=>{

                  history.push("/")
                  window.location.reload()
              })
        }
        

    }

  return (
    <Fragment>
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{setName(e.target.value)}}
              name="Name"
              defaultValue={postDetails.name}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              name="category"
              defaultValue={postDetails.category}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname"
            onChange={(e)=>{setPrice(e.target.value)}}
            name="Price"
            defaultValue={postDetails.price}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : postDetails.url}></img>
          <form>
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button className="uploadBtn" onClick={handleEdit}>Update and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Edit;