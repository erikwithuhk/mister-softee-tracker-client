import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup, login, logOut } from '../actions/authActions';
import { fetchUsers } from '../actions/userActions';

const propTypes = {
  children: React.PropTypes.element,
};

@connect((store) => {
  return {
    session: store.session.session,
    user: store.users,
  };
})

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }
  componentDidMount() {
    const user = {
      email: 'efjonsson@gmail.com',
      password: 'password',
    };
    this.props.dispatch(signup(user));
  }
  logOut() {
    this.props.dispatch(logOut());
  }
  fetchUsers() {
    this.props.dispatch(fetchUsers());
  }
  render() {
    const { email } = this.props.session;
    return (
      <div className="app">
        <h1>{`This is the App, ${email}`}</h1>
        <button onClick={this.logOut}>Log out</button>
        <button onClick={this.fetchUsers}>Fetch users</button>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
