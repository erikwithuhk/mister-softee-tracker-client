import React, { Component } from 'react';
import { Link } from 'react-router';

const propTypes = {

};

class TopNav extends Component {
  render() {
    return (
      <header>
        {/* <div className="flex-container"> */}
          <Link to="/"><div className="logo_icon" /></Link>
          <h2>Map</h2>
        {/* </div> */}
      </header>
    );
  }
}

TopNav.propTypes = propTypes;

export default TopNav;
