import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'react-fa';

const propTypes = {
  pathname: React.PropTypes.string,
};

const bottomNav = ({ pathname, session }) => {
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

  const requestsLink = (
    <Link to="/request" className={`bottom-nav_item ${requestSelected}`}>
      <Icon className="bottom-nav_icon" name="hand-o-up" />
      <p className="bottom-nav_label" >Requests</p>
    </Link>
  );
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav_item ${mapSelected}`}>
        <Icon className="bottom-nav_icon" name="map-o" />
        <p className="bottom-nav_label" >Map</p>
      </Link>
      {session.userType === 'Vendor' ? requestsLink : ''}
      <Link to="/account" className={`bottom-nav_item ${accountSelected}`}>
        <Icon className="bottom-nav_icon" name="user-o" />
        <p className="bottom-nav_label" >Account</p>
      </Link>
    </nav>
  );
};

bottomNav.propTypes = propTypes;

export default bottomNav;
