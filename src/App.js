import React, { Component } from 'react';
import Routes from "./Routes";
import { BrowserRouter as Router } from 'react-router-dom';

// styling
import './App.css';
import './css/styles.css';
import './assets/bootstrap/css/bootstrap.min.css';

//components
import Header from './components/Navigation/NavigationHeader';

class App extends Component {
  render() {  
    return (
      <Router>
        <Header />

        <Routes />
      </Router>
    );
  }
}

export default App;
