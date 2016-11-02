import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
import { GoogleMap, Marker, SearchBox } from 'react-google-maps';

import TopNav from './navs/TopNav.jsx';
import Map from './map.jsx';
import BottomNav from './navs/bottomNav.jsx';

// import { logOut } from '../actions/authActions';

const propTypes = {
  route: React.PropTypes.object,
};

// @connect((store) => {
//   return {
//     session: store.session.session,
//   };
// })

class App extends Component {
  render() {
    return (
      <div className="app">
        <TopNav />
        <Map />
        {/* <div className="map" /> */}
        <BottomNav routePath={this.props.route.path} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
