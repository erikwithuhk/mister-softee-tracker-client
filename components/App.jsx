import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
import TopNav from './navs/TopNav.jsx';

// import { logOut } from '../actions/authActions';

const propTypes = {

};

// @connect((store) => {
//   return {
//     session: store.session.session,
//   };
// })

class App extends Component {
  render() {
    return (
      <div className="app">
        <TopNav />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
