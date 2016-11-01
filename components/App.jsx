import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logOut } from '../actions/authActions';

const propTypes = {
  children: React.PropTypes.element,
};

@connect((store) => {
  return {
    session: store.session.session,
  };
})

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    this.props.dispatch(logOut());
  }
  authButton() {
    const { authToken } = this.props.session;
    if (!authToken && this.props) {
      return (
        <Link to="/login">Log in</Link>
      );
    }
    return (
      <button onClick={this.logOut}>Log out</button>
    );
  }
  render() {
    const button = this.authButton();
    return (
      <div className="app">
        <h1>This is the App</h1>
        {button}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
