import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Home from './containers/Home';
import Course from './containers/Course';
import SlideHandlerPage from './containers/SlideHandlerPage';


import SamplePage from './containers/SamplePage';

function Routes() {
  return (
    <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/course/:cid' component={ Course } />
        <Route exact path='/course/:cid/lesson/:lid/add-slide' component={ SlideHandlerPage } />
        <Route exact path='/course/:cid/lesson/:lid/edit-slide/:sid' component={ SlideHandlerPage } />


        <Route exact path='/sample' component={ SamplePage } />
    </Switch>
  );
}

export default Routes;