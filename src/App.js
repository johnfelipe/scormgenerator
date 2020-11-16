import React, { useEffect } from 'react';
import Routes from "./Routes";
import { BrowserRouter as Router } from 'react-router-dom';
// import { HashRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Navigation/NavigationHeader';
import './styles/css/styles.css';
import './App.css';
import { history } from './helpers';
import Spinners from './components/Common/Spinners';
import { courseActions } from './actions';

function App() {

    const dispatch = useDispatch();
    const apiResponse = useSelector(state => state.course.apiResponse ? state.course.apiResponse : []);
    const checkApi = useSelector(state => state.course.checkApi ? state.course.checkApi : 0);

    useEffect(() => {
        if (apiResponse.length === 0 && (checkApi === 404 || checkApi === 0)) {
            dispatch(courseActions.checkApi());
        }
    });

    return (
        <Router history={history}>
            {apiResponse.length === 0 && (checkApi === 404 || checkApi === 0) ?
                    <Spinners />
                :
                    <>
                        <Header />

                        <Routes />
                    </>
            }
        </Router>
    );
}

export default App;
