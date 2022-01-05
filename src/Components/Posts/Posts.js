import React, { useState, useEffect, useContext, useRef } from 'react';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './Post.css';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import { SearchContext } from '../../store/SearchContext';

function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const history = useHistory()
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;
  const { searchItem } = useContext(SearchContext)
  const inputRef = useRef();

  useEffect(() => {
    firebase.firestore().collection('events').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
    })
  }, [])

  const displayUsers = products
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((product) => {
      return (
        <div class="col-lg-4">
          <div class="post-box">
            <div class="post-img"><img src={product.url} class="img-fluid" alt="" /></div>
            <h3 class="post-title">{product.name}</h3>
            <span class="post-desc">Category : {product.category}</span>
            <span class="post-date">Price : &#x20B9; {product.price}</span>
          </div>
        </div>
      )
    })

  const displaySearch = searchItem?.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((product) => {
      return (
        <div class="col-lg-4">
          <div class="post-box">
            <div class="post-img"><img src={product.url} class="img-fluid" alt="" /></div>
            <h3 class="post-title">{product.name}</h3>
            <span class="post-desc">Category : {product.category}</span>
            <span class="post-date">Price : &#x20B9; {product.price}</span>
          </div>
        </div>
      )
    })

  const pageCount = Math.ceil(products.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.history.pushState('page2', 'Title', selected + 1);
  };

  
  return (
    <div>
      <section id="recent-blog-posts" class="recent-blog-posts">

        <div class="container">

          <header class="section-header">
            <p>All Events</p>
          </header>
          <div class="row">

            {!searchItem ?
              displayUsers
              :
              displaySearch
            }
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
                disabledListClassName={'disabled'}
                ref={inputRef}
              />
          </div>

        </div>

      </section>
    </div>

  );
}

export default Posts;