import React from 'react'
import './Search.css'
import { PostContext } from '../../store/PostContext'
import { SearchContext } from '../../store/SearchContext'
import { useContext } from 'react'
import { useHistory } from 'react-router'

function Search() {

    const {setPostDetails} = useContext(PostContext) 
    const {searchItem} = useContext(SearchContext)

    const history = useHistory()

    console.log("searchItem")
    console.log(searchItem)

    return (
        <div className="postParentDiv">
            <div className="moreView">
        <div className="heading">
          <span>Search results</span>
        </div>
        <div className="cards">
            {searchItem && searchItem.map((item,index)=>{
                return(
                    <div 
                className="card"
                onClick={()=>{
                    setPostDetails(item)
                    history.push("/view")
                }}
              >

                <div className="image">
                  <img src={item.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9;{item.price} </p>
                  <span className="kilometer">{item.category}</span>
                  <p className="name">{item.name}</p>
                </div>
                <div className="date">
                  <span>{item.createdAt}</span>
                </div>
              </div>
                )
            })}
              
            
          

        </div>
      </div>
        </div>
    )
}

export default Search
