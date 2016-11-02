import React from 'react';
import { Link } from 'react-router';

const propTypes = {
  routePath: React.PropTypes.string,
};

const bottomNav = ({ routePath }) => {
  let mapSelected = '';
  let requestSelected = '';
  let accountSelected = '';

  const selectedClassName = 'bottom-nav_item--selected';
  switch (routePath) {
    case '/': {
      mapSelected = selectedClassName;
      break;
    }
    case '/request': {
      requestSelected = selectedClassName;
      break;
    }
    case '/account': {
      accountSelected = selectedClassName;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav_item ${mapSelected}`}>
        <p>Map</p>
      </Link>
      <Link to="/" className={`bottom-nav_item ${requestSelected}`}>
        <p>Request</p>
      </Link>
      <Link to="/" className={`bottom-nav_item ${accountSelected}`}>
        <p>Account</p>
      </Link>
    </nav>
  );
};

bottomNav.propTypes = propTypes;

export default bottomNav;
