import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Home from './containers/Home';
import Course from './containers/Course';

export default function Routes() {
  return (
    <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/course/:cid' component={ Course } />
    </Switch>
  );
}