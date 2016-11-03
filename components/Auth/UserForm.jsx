import React, { Component } from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import TopNav from '../navs/TopNav.jsx';

import { signup, login } from '../../actions/authActions';

const propTypes = {
  dispatch: React.PropTypes.func,
  route: React.PropTypes.object,
  submitUserForm: React.PropTypes.func,
};

@connect((store) => {
  return {
    session: store.session.session,
  };
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
    console.log(path);
    if (path === '/login') {
      this.props.dispatch(login(this.state));
      this.setState({ email: '', password: '' });
      hashHistory.push('/');
    } else if (path === '/signup') {
      this.props.dispatch(signup(this.state));
      this.setState({ email: '', password: '' });
      hashHistory.push('/');
    }
  }
  render() {
    const { email, password } = this.state;
    const { location, route } = this.props;

    let pageTitle;
    let oppositePageTitle;
    let oppositePageLink;
    if (route.path === '/signup') {
      pageTitle = 'Create an account';
      oppositePageTitle = 'log in';
      oppositePageLink = '/login';
    } else if (route.path === '/login') {
      pageTitle = 'Log in';
      oppositePageTitle = 'create an account';
      oppositePageLink = '/signup';
    }
    return (
      <div className="container">
        <TopNav page={location.pathname} />
        <main>
          <section className="user-form-container">
            <form className="user-form" onSubmit={this.handleSubmit}>
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
                value={pageTitle}
              />
              <Link to={oppositePageLink} className="switch-user-form" >
                {`Or ${oppositePageTitle}`}
              </Link>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

UserForm.propTypes = propTypes;

export default withRouter(UserForm);
