import React, { Component } from 'react';
import { Link } from 'react-router';

const propTypes = {

};

class BottomNav extends Component {
  render() {
    return (
      <div className="bottom-nav">
        <Link to="/" className="bottom-nav_item">
          <p>Map</p>
        </Link>
        <Link to="/" className="bottom-nav_item">
          <p>Request</p>
        </Link>
        <Link to="/" className="bottom-nav_item">
          <p>Account</p>
        </Link>
      </div>
    );
  }
}

BottomNav.propTypes = propTypes;

export default BottomNav;
