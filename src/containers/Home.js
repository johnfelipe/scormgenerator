import React, { Component } from 'react';

// styling
import '../App.css';
import '../css/styles.css';
import '../assets/bootstrap/css/bootstrap.min.css';

//components
// import Generator from '../components/Generator/Generator';
import Main from '../components/Generator/Main';

class Home extends Component {
  render() {  
    return (
        <div className="container-fluid">
            <Main />
        </div>
    );
  }
}

export default Home;
