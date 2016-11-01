import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';

import { setUserName } from '../actions/userActions';
import { login } from '../actions/authActions';

const propTypes = {
  children: React.PropTypes.element,
};

@connect((store) => {
  return {
    user: store.user,
    session: store.session,
  };
})

class App extends Component {
  componentDidMount() {
    const user = {
      email: 'efjonsson@gmail.com',
      password: 'password',
    };
    this.props.dispatch(login(user));
    this.props.dispatch(setUserName('Erik'));
  }
  render() {
    const { user } = this.props;
    return (
      <div className="app">
        <h1>{`This is the App, ${user.name}`}</h1>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
