import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'react-fa';

const propTypes = {
  pathname: React.PropTypes.string,
};

const bottomNav = ({ pathname }) => {
  let mapSelected = '';
  let requestSelected = '';
  let accountSelected = '';

  const selectedClassName = 'bottom-nav_item--selected';
  switch (pathname) {
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
        <Icon className="bottom-nav_icon" name="map-o" />
        <p className="bottom-nav_label" >Map</p>
      </Link>
      <Link to="/request" className={`bottom-nav_item ${requestSelected}`}>
        <Icon className="bottom-nav_icon" name="hand-o-up" />
        <p className="bottom-nav_label" >Request</p>
      </Link>
      <Link to="/account" className={`bottom-nav_item ${accountSelected}`}>
        <Icon className="bottom-nav_icon" name="user-o" />
        <p className="bottom-nav_label" >Account</p>
      </Link>
    </nav>
  );
};

bottomNav.propTypes = propTypes;

export default bottomNav;
