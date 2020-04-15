import React, { Component } from 'react';

// styling
import './App.css';
import './css/styles.css';
import './assets/bootstrap/css/bootstrap.min.css';

// containers
import FeatureContainer from './components/Features';

class App extends Component {
  render() {  
    return (
      <div className="container-fluid">
        <FeatureContainer />
      </div>
    );
  }
}

export default App;
