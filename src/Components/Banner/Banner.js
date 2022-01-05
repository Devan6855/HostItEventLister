import React from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { useHistory } from 'react-router';

function Banner() {
  const history = useHistory()

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>CATEGORIES FILTER : </span>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>{history.push("/nike")}} className="nikeSpan"> <strong>Nike</strong> </span>
            <span onClick={()=>{history.push("/adidas")}} className="adidasSpan"><strong>Adidas</strong></span>
          </div>
        </div>
        <div className="banner">
        </div>
      </div>
      
    </div>
  );
}

export default Banner;