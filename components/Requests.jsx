import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';

import { fetchVendorRequests } from '../actions/vendorActions'

const propTypes = {
  dispatch: React.PropTypes.func,
  requests: React.PropTypes.array,
  session: React.PropTypes.object,
};

@connect((store) => {
  return {
    requests: store.vendor.requests,
    session: store.session.session,
  };
})

class Requests extends Component {
  componentDidMount() {
    this.fetchRequests();
  }
  fetchRequests() {
    this.props.dispatch(fetchVendorRequests(this.props.session.userID));
  }
  render() {
    const requestNodes = this.props.requests.map(request => (
      <li key={request.id}>
        <p>A customer wants you to stay in your current location.</p>
        <button>Approve</button>
        <button>Reject</button>
      </li>
    ));
    return (
      <ul className="requests-list">
        {requestNodes}
      </ul>
    );
  }
}

Requests.propTypes = propTypes;

export default Requests;
