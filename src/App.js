import React, { Component } from 'react';
import Routes from "./Routes";
import { BrowserRouter as Router } from 'react-router-dom';

//components
import Header from './components/Navigation/NavigationHeader';

// styling
import './styles/css/styles.css';
import './App.css';

// helpers
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
