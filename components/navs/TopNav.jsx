import React, { Component } from 'react';
import { Link } from 'react-router';

const propTypes = {
  page: React.PropTypes.string,
};

class TopNav extends Component {
  render() {
    const { page } = this.props;
    let pageTitle;
    switch (page) {
      case '/': {
        pageTitle = 'Map';
        break;
      }
      case '/account': {
        pageTitle = 'Account';
        break;
      }
      case '/login': {
        pageTitle = 'Log In';
        break;
      }
      case '/signup': {
        pageTitle = 'Create an Account';
        break;
      }
      default: {
        pageTitle = 'Mister Softee Tracker';
      }
    }
    return (
      <header>
        <Link to="/"><div className="logo_icon" /></Link>
        <h2>{pageTitle}</h2>
      </header>
    );
  }
}

TopNav.propTypes = propTypes;

export default TopNav;
