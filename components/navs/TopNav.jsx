import React, { Component } from 'react';
import { Link } from 'react-router';

const propTypes = {

};

class TopNav extends Component {
  render() {
    return (
      <header>
        <Link to="/"><div className="logo_icon" /></Link>
        <h2>Map</h2>
      </header>
    );
  }
}

TopNav.propTypes = propTypes;

export default TopNav;
