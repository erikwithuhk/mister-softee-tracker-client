import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';

import { apiRequest } from '../services/APIRequest';

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
  constructor(props) {
    super(props);
    this.state = {
      requestNodes: [],
    };
    this.approveRequest = this.approveRequest.bind(this);
    this.rejectRequest = this.rejectRequest.bind(this);
  }
  componentDidMount() {
    document.body.style.zoom = 1.0;
    this.fetchRequests();
  }
  fetchRequests() {
    this.props.dispatch(fetchVendorRequests(this.props.session.userID));
  }
  approveRequest(e) {
    const buttonNode = e.target;
    const requestID = buttonNode.getAttribute('data-request-id');
    const baseURL = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/requests';
    apiRequest.patch(`${baseURL}/${requestID}`, { request: { status: 'approved' } })
              .then((response) => {
                this.fetchRequests();
              })
              .catch(err => console.error(err));
  }
  rejectRequest(e) {
    const buttonNode = e.target;
    const requestID = buttonNode.getAttribute('data-request-id');
    const baseURL = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/requests';
    apiRequest.patch(`${baseURL}/${requestID}`, { request: { status: 'rejected' } })
              .then((response) => {
                this.fetchRequests();
              })
              .catch(err => console.error(err));
  }
  render() {
    let requestNodes = [];
    this.props.requests.forEach((request) => {
      if (request.status === 'pending') {
        requestNodes.push(
          <li key={request.id}>
            <p className="request-list-item_text">
              A customer wants you to stay in your current location.
            </p>
            <button
              className="request-list-item_button request-list-item_button--approve"
              data-request-id={request.id}
              onClick={this.approveRequest}
            >
              Approve
            </button>
            <button
              className="request-list-item_button request-list-item_button--reject"
              data-request-id={request.id}
              onClick={this.rejectRequest}
            >
              Reject
            </button>
          </li>
        );
      }
    });
    if (requestNodes.length < 1) {
      requestNodes = (<p className="no-requests-message">No pending requests</p>);
    }
    return (
      <ul className="requests-list">
        {requestNodes}
      </ul>
    );
  }
}

Requests.propTypes = propTypes;

export default Requests;
