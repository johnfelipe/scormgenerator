import React from "react";
import { Route, Switch } from "react-router-dom";

// components
// import Generator from './components/Generator/Generator';
import Main from './components/Generator/Main';

export default function Routes() {
  return (
    <Switch>
        <Route path='/' exact component={ Main } />
        {/* <Route path='/' exact component={ Generator } /> */}
    </Switch>
  );
}