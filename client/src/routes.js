import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Withdrawal from './components/withdrawal/withdrawal'


export default function Routes() {
  return ( 
    <Router>
        <ul> 
          <li>
            <Link to="/withdraw">Withdraw</Link>
          </li> 
        </ul>
        <Switch >
          <Route exact path="/">
            <Redirect to="/withdraw" />
          </Route>
          <Route path="/withdraw">
            <Withdrawal />
          </Route> 
        </Switch>
    </Router> 
  );
}
