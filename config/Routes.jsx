import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from '../components/App.jsx';
import Account from '../components/Account.jsx';
import Map from '../components/Map.jsx';
import Requests from '../components/Requests.jsx';
import UserForm from '../components/Auth/UserForm.jsx';
import NotFound from '../components/NotFound.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route name="app" path="/" component={App} >
      <IndexRoute name="map" component={Map} />
      <Route name="request" path="request" component={Requests} />
      <Route name="account" path="account" component={Account} />
    </Route>
    <Route name="login" path="/login" component={UserForm} />
    <Route name="signup" path="/signup" component={UserForm} />
    <Route name="not-found" path="*" component={NotFound} />
  </Router>
);

export default Routes;
