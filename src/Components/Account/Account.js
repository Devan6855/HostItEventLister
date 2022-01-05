import React, { useEffect, useState,useContext } from 'react'
import { useHistory } from 'react-router'
// import { useContext } from 'react/cjs/react.development'
import { AuthContext , FirebaseContext } from '../../store/Context'
import { PostContext } from '../../store/PostContext'
import './Account.css'

function Account() {

    const [accountDetails, setAccountDetails] = useState([])

    const {user} = useContext(AuthContext)
    const {firebase} = useContext(FirebaseContext)
    const {setPostDetails} = useContext(PostContext)
    const history = useHistory()

    useEffect(() => {
        firebase.firestore().collection('products').get().then((snapshot)=>{
            const allProducts = snapshot.docs.map((product) => {
                return {
                  ...product.data(),
                  id: product.id
                }
              })
            //   console.log(allProducts)
              const filterData = allProducts?.filter(itm=> itm?.userId===user?.uid)
              setAccountDetails(filterData)
            //   console.log(filterData)
        })
    }, [])


    return (
        <div>
           
      <div className="container">
          
{accountDetails.length===0 ?
""
:<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
      {accountDetails.map((item,index)=>{
          return(
    <tr>
      <th scope="row"></th>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.category}</td>
      <td><button type="button" class="btn btn-success"
      onClick={()=>{
        setPostDetails(item)
        history.push("/edit")
      }}
      >Edit</button></td>
      <td><button type="button" class="btn btn-danger"
      onClick={()=>{
        firebase.firestore().collection('products').doc(item.id).delete().then(()=>{
          history.push("/")
      })}}
      >Delete</button></td>
    </tr>
          )
      })}
  </tbody>
</table>}
      </div>
        </div>
    )
}

export default Account
