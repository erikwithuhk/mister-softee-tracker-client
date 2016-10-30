import React, { Component } from 'react';

const propTypes = {
  route: React.PropTypes.object,
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const stateKey = e.target.name;
    const stateValue = e.target.value;
    const newState = {};
    newState[stateKey] = stateValue;
    this.setState(newState);
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email" >Email</label>
        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
        <label htmlFor="password" >Password</label>
        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <input
          type="submit"
          value={this.props.route.path === 'login' ? 'Log in' : 'Create an account'}
        />
      </form>
    );
  }
}

UserForm.propTypes = propTypes;

export default UserForm;
