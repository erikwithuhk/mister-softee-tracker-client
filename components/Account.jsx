import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { logOut } from '../actions/authActions';

const propTypes = {

};

@connect((store) => {
  return {
    session: store.session.session,
  };
})

class Account extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    this.props.dispatch(logOut());
    hashHistory.push('/');
  }
  render() {
    const { session } = this.props;
    return (
      <section className="account-container">
        <h3>{session.email}</h3>
        <p>{session.userType}</p>
        <button className="signout-button" onClick={this.logOut}>Sign out</button>
      </section>
    );
  }
}

Account.propTypes = propTypes;

export default Account;
