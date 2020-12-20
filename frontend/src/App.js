import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import Home from "./components/home.js";
import Dashboard from "./components/dashboard.js";
import PrivateRoute from "./components/privateRoute.js";
import CustomRoute from "./components/customRoute.js";
import { withCookies } from 'react-cookie';

function App({ cookies }) {
  return (
    <Router basename={"/1704389" || "/"}>
      <Switch>
        <CustomRoute cookies={cookies} component={withRouter(Home)} path={"/"} exact={true} />
        <PrivateRoute cookies={cookies} component={withRouter(Dashboard)} path={"/dashboard"} exact={true} />
      </Switch>
    </Router>
  );
}

export default withCookies(App);