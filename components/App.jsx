import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { GoogleMap, Marker, SearchBox } from 'react-google-maps';

import TopNav from './navs/TopNav.jsx';
import BottomNav from './navs/bottomNav.jsx';

const propTypes = {
  children: React.PropTypes.element,
  route: React.PropTypes.object,
  session: React.PropTypes.object,
};

@connect((store) => {
  return {
    session: store.session.session,
  };
})

class App extends Component {
  render() {
    const { children, location, session } = this.props;

    let signedInNav;
    if (session.authToken) {
      signedInNav = (<BottomNav pathname={location.pathname} />);
    } else {
      signedInNav = (
          <Link to="/signup" className="bottom-button">
            <p className="primary-cta">Create an account</p>
            <p className="secondary-cta">or log in</p>
          </Link>
      );
    }

    return (
      <div className="container">
        <TopNav page={!session.authToken ? 'Mister Softee Tracker' : location.pathname} />
        <main>
          {children}
        </main>
        {signedInNav}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
