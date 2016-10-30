import React, { Component } from 'react';

const propTypes = {
  children: React.PropTypes.element,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Erik' },
    };
    this.submitUserForm = this.submitUserForm.bind(this);
  }
  submitUserForm({ type, userData }) {
    if (type === 'login') {
      this.logInUser(userData);
    } else {
      this.createUser(userData);
    }
  }
  logInUser({ email, password }) {
    console.log('log in', email, password);
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
