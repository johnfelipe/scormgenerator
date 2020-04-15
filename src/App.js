import React, { Component } from 'react';

// styling
import './App.css';
import './css/styles.css';
import './assets/bootstrap/css/bootstrap.min.css';

// containers
import Generator from './components/Generator';

class App extends Component {
  render() {  
    return (
      <div className="container-fluid">
        <Generator />
      </div>
    );
  }
}

export default App;
