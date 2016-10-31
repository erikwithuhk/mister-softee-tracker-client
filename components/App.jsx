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
  }
  updateAuth() {
    this.setState({
      token: cookie.load('token'),
    });
  }
  submitUserForm({ type, userData }) {
    if (type === 'login') {
      this.logInUser(userData);
    } else {
      this.createUser(userData);
    }
  }
  logInUser({ email, password }) {
    const url = '/api/v1/login';
    request.post(url)
           .send({ email, password })
           .then(() => this.updateAuth())
           .catch(err => console.error(err));
  }
  createUser({ email, password }) {
    console.log('create', email, password);
  }
  render() {
    const childrenWithProps = React.cloneElement(this.props.children, {
      currentUser: this.state.currentUser,
      submitUserForm: this.submitUserForm,
    });
    return (
      <div className="app">
        {childrenWithProps}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
