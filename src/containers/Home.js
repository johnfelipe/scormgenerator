import React, { Component } from 'react';

//components
// import Generator from '../components/Generator/Generator';
import Main from '../components/Generator/Main';

class Home extends Component {
  render() {  
    return (
        <div className="container-fluid">
            <Main />
            {/* <Generator /> */}
        </div>
    );
  }
}

export default Home;
