import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Generator from './components/Generator/Generator';

export default function Routes() {
  return (
    <Switch>
        <Route path='/' exact component={ Generator } />
        
    </Switch>
  );
}