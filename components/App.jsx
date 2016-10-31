import React, { Component } from 'react';
import request from 'superagent';
import cookie from 'react-cookie';

const propTypes = {
  children: React.PropTypes.element,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
    this.submitUserForm = this.submitUserForm.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
  }
  submitUserForm({ type, userData }) {
    let url;
    if (type === 'login') {
      url = '/api/v1/login';
    } else if (type === 'signup') {
      url = '/api/v1/signup';
    }
    request.post(url)
           .send(userData)
           .then(() => this.updateAuth())
           .catch(err => console.error(err));
  }
  signOut() {
    request.delete('/api/v1/signout')
           .then(() => this.updateAuth())
           .catch(err => console.error(err));
  }
  updateAuth() {
    this.setState({
      token: cookie.load('token') || null,
    });
  }
  render() {
    let signoutButton;
    if (this.state.token !== null) {
      signoutButton = (
        <button onClick={this.signOut}>Sign out</button>
      );
    }
    const childrenWithProps = React.cloneElement(this.props.children, {
      currentUser: this.state.currentUser,
      submitUserForm: this.submitUserForm,
    });
    return (
      <div className="app">
        {signoutButton}
        {childrenWithProps}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
