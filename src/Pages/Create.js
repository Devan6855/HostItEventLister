import React, {useContext} from 'react';

import Create from '../Components/Create/Create';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Create />
      <Footer />
    </div>
  );
}

export default Home;