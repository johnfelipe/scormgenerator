import React, { useEffect } from 'react';
import Routes from "./Routes";
import { HashRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Navigation/NavigationHeader';
import './styles/css/styles.css';
import './App.css';
import { history } from './helpers';
import Spinners from './components/Common/Spinners';
import { courseActions } from './actions';

function App() {

    const dispatch = useDispatch();
    const courses = useSelector(state => state.course.courses ? state.course.courses : []);

    useEffect(() => {
        if (courses.length === 0) {
            dispatch(courseActions.getAll());
        }
    });

    return (
        <Router history={history}>
            {courses.length === 0 ?
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
