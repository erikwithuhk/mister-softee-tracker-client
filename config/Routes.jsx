import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.jsx';
import Main from './components/Main.jsx';
import UserForm from './components/Auth/UserForm.jsx';
import NotFound from './components/NotFound.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route name="app" path="/" component={App} >
      <IndexRoute name="main" component={Main} />
      <Route name="login" path="login" component={UserForm} />
      <Route name="signup" path="signup" component={UserForm} />
      <Route name="not-found" path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
