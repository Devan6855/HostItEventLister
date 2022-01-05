import React, { useContext, useState } from 'react';

import './Header.css';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
// import { useState } from 'react/cjs/react.development';
import { SearchContext } from '../../store/SearchContext';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/searchIcon.png'


function Header() {
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const { searchItem, setSearchItem } = useContext(SearchContext)
  const [search, setSearch] = useState("")
  const history = useHistory()
  const [arry, setArry] = useState([])
  const [category, setCategory] = useState("");

  const changeBrandFilter = (e) => {
    e.preventDefault();
    firebase.firestore().collection('events').get().then((snapshot) => {
      const allSearch = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
     console.log(search);
      const filterData = allSearch.filter(
        itm => itm.category.includes(category)
      )
      setSearchItem(filterData)
    })
    history.push("/")
  }

  const changeSearchFilter = (e) => {
    console.log(search);
    e.preventDefault();
    firebase.firestore().collection('events').get().then((snapshot) => {
      const allSearch = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      // setSearch(e.target.value);
      const filterData = allSearch.filter(
        itm => itm.name.includes(search.toUpperCase())
      )
      setSearchItem(filterData)
    })
    history.push("/")
  }

  return (
    <div>
      <header id="header" class="header">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

          <a onClick={()=>{
            window.history.pushState('page2', 'Title', '');
            history.push('/')}} href='' class="logo d-flex align-items-center text-decoration-none">
            <img src={logo} alt="" />
            <span>HostiT</span>
          </a>
          <div class='header-search'>
            <form action="" onSubmit={changeSearchFilter}>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} name="email" /><input type="submit" value="Search" />
            </form>
          </div>

          <nav id="navbar" class="navbar">
            <ul>
              {/* <li><a class="nav-link scrollto active" href="#hero">Home</a></li> */}
              <li className="">
              <select class="form-select" value={category} onChange={(e) => { setCategory(e.target.value)}} aria-label="Default select example">
                <option selected>Select Category</option>
                <option value="Business">Business</option>
                <option value="Parties">Parties</option>
                <option value="Sports">Sports</option>
                <option value="Festivals">Festivals</option>
              </select>
              </li>
              <span className="search-btn" onClick={(e)=>{changeBrandFilter(e); window.history.pushState('page2', 'Title', 'filter/'+category);}}><img class='searchIcon' src={searchIcon}/></span>
              <>
                {user ? <li class="dropdown"><a href="#"><span>{`Welcome ${user.displayName}`}</span> <i class="bi bi-chevron-down"></i></a>
                  <ul>
                    <li><a onClick={() => {
                      firebase.auth().signOut();
                      history.push("/")
                    }}>Logout</a></li>
                  </ul>
                </li> : <a href='' class="nav-link scrollto" onClick={() => { history.push("/login") }}>Login</a>}
              </>
              <li><a class="getstarted scrollto text-decoration-none" onClick={() => { user? history.push('/create'): history.push('/login') }}>Create an event</a></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </div>

  );
}

export default Header;