import React, { Component } from 'react';
import Routes from "./Routes";
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Navigation/NavigationHeader';
import './styles/css/styles.css';
import './App.css';
import { history } from './helpers';

class App extends Component {

    render() {  
        return (
            <Router history={history}>
                <Header />

                <Routes />
            </Router>
        );
    }
}

export default App;
