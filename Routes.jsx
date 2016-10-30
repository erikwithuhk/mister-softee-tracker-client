import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.jsx';
import NotFound from './components/NotFound.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route name="app" path="/" component={App} />
    <Route name="not-found" path="*" component={NotFound} />
  </Router>
);

export default Routes;
