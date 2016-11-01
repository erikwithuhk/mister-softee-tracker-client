import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { signup, login } from '../../actions/authActions';

const propTypes = {
  dispatch: React.PropTypes.func,
  route: React.PropTypes.object,
  submitUserForm: React.PropTypes.func,
};

@connect((store) => {
  return {};
})

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
    const { path } = this.props.route;
    if (path === 'login') {
      this.props.dispatch(login(this.state));
      this.setState({ email: '', password: '' });
      hashHistory.push('/');
    } else if (path === 'signup') {
      this.props.dispatch(signup(this.state));
      this.setState({ email: '', password: '' });
      hashHistory.push('/');
    }
  }
  render() {
    const { email, password } = this.state;
    const { path } = this.props.route;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email" >Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={this.handleChange}
        />
        <label htmlFor="password" >Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value={path === 'login' ? 'Log in' : 'Create an account'}
        />
      </form>
    );
  }
}

UserForm.propTypes = propTypes;

export default withRouter(UserForm);
