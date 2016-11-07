import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';

import { apiRequest } from '../services/APIRequest';

import { updatePosition } from '../actions/userActions';
import { fetchCustomers } from '../actions/customerActions';
import { fetchVendors } from '../actions/vendorActions';

const propTypes = {
};

@connect((store) => {
  return {
    session: store.session.session,
    position: store.user.position,
    customers: store.customer.customers,
    vendors: store.vendor.vendors,
  };
})

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: {},
      currentPositionMarker: null,
      position: null,
    };

    this.defaultCenter = new google.maps.LatLng(40.6782, -73.9442);
    this.map = null;

    this.clearPositionInterval = this.clearPositionInterval.bind(this);
  }
  componentDidMount() {
    this.initializeMap();
    this.state.intervalID = setInterval(() => {
      this.getUserPosition();
      if (!this.props.session.authToken || this.props.session.userType === 'Customer') {
        this.props.dispatch(fetchVendors());
      } else if (this.props.session.userType === 'Vendor') {
        this.props.dispatch(fetchCustomers());
      }
      this.getMarkers();
      if (this.map.getCenter() === this.defaultCenter && this.state.position) {
        this.recenterMap();
        this.createCurrentPositionMarker();
      }
      if (this.state.currentPositionMarker) {
        this.setCurrentPositionMarker();
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }
  getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ position: { lat: latitude, lng: longitude } });
        if (this.props.session.userID) {
          this.props.dispatch(updatePosition({
            userID: this.props.session.userID,
            lat: latitude,
            lng: longitude,
          }));
        }
      });
    }
  }
  clearPositionInterval() {
    clearInterval(this.getPositions);
  }
  initializeMap() {
    this.map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 13,
      draggable: true,
      center: this.defaultCenter,
    });
    this.addMapEventListeners();
  }
  addMapEventListeners() {
    window.addEventListener('resize', () => {
      google.maps.event.trigger(this.map, 'resize')
      this.recenterMap();
    });
  }
  createCurrentPositionMarker() {
    const currentPositionMarker = new google.maps.Marker({
      map: this.map,
      position: this.state.position,
      anchorPoint: new google.maps.Point(0, 0),
      icon: {
        url: '../images/mister-softee-tracker_current-location-dot.svg',
        scaledSize: new google.maps.Size(64, 64),
      },
      opacity: 0.75,
    });
    setTimeout(() => {

    });
    this.setState({ currentPositionMarker });
  }
  setCurrentPositionMarker() {
    this.state.currentPositionMarker.setPosition(this.state.position);
  }
  getMarkers() {
    let users;
    if (!this.props.session.authToken || this.props.session.userType === 'Customer') {
      users = this.props.vendors;
    } else if (this.props.session.userType === 'Vendor') {
      users = this.props.customers;
    }
    users.forEach((user) => {
      if (this.state.markers.hasOwnProperty(user.id)) {
        this.setMarkerPosition(user);
      } else if (user.position_lat !== null && user.position_lng !== null) {
        this.createMarker(user);
      }
    });
  }
  createMarker(user) {
    let url;
    let scaledSize;
    if (user.type === 'Customer') {
      url = '../images/mister-softee-tracker_customer.svg';
      scaledSize = new google.maps.Size(25, 50);
    } else if (user.type === 'Vendor') {
      url = '../images/mister-softee-tracker_truck-icon.svg';
      scaledSize = new google.maps.Size(50, 32);
    }
    const infoWindow = new google.maps.InfoWindow({
      content: '',
      pixelOffset: new google.maps.Size(0, 0),
    });
    const marker = new google.maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0, 0),
      position: new google.maps.LatLng(user.position_lat,user.position_lng),
      title: `${user.id}`,
      icon: {
        url,
        scaledSize,
      },
    });
    if (this.props.session.authToken) {
      marker.addListener('click', () => {
        infoWindow.setContent('Loading...');
        infoWindow.open(this.map, marker);
        const customerID = this.props.session.userID;
        const vendorID = user.id;
        const baseURL = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/requests';
        const query = `?customer_id=${customerID}&vendor_id=${vendorID}`;
        apiRequest.get(`${baseURL}${query}`)
                  .then((response) => {
                    const freezeRequest = response.data[0]
                    if (freezeRequest) {
                      switch (freezeRequest.status) {
                        case 'pending': {
                          infoWindow.setContent('<p>Waiting for response...</p>');
                          setTimeout(() => {
                            infoWindow.close();
                          }, 5000);
                          break;
                        }
                        case 'approved': {
                          infoWindow.setContent('<p>Approved!</p>');
                          setTimeout(() => {
                            infoWindow.close();
                          }, 5000);
                          break;
                        }
                        case 'rejected': {
                          infoWindow.setContent('<p>Rejected :(</p>');
                          setTimeout(() => {
                            infoWindow.close();
                          }, 5000);
                          break;
                        }
                        default: {
                        }
                      }
                    } else {
                      infoWindow.setContent('<p>Hold it!</p><button class="freeze-button">Freeze</button>');
                      const freezeButton = document.querySelector('.freeze-button');
                      if (freezeButton) {
                        freezeButton.addEventListener('click', () => this.initiateFreezeRequest({ infoWindow, vendorID, customerID }));
                      }
                    }
                  })
                  .catch(err => console.error(err));
      });
    }
    const newMarkerState = this.state.markers;
    newMarkerState[user.id] = marker;
    setTimeout(() => {
      this.setState({ markers: newMarkerState });
    }, 1000);
  }
  setMarkerPosition(user) {
    const userPosition = {
      lat: user.position_lat,
      lng: user.position_lng,
    };
    this.state.markers[user.id].setPosition(userPosition);
  }
  recenterMap() {
    this.map.setCenter(this.state.position);
  }
  initiateFreezeRequest({ infoWindow, vendorID, customerID }) {
    const baseURL = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/requests';
    apiRequest.post(`${baseURL}`, { request: { customer_id: customerID, vendor_id: vendorID } })
              .then((response) => {
                console.log(response.data);
                infoWindow.setContent('<p>Waiting for response...</p>');
              })
              .catch((err) => {
                infoWindow.setContent('<p>Request did not go through</p>');
                console.error(err);
              });
  }
  render() {
    return (
      <section className="map" >
        {/* <div className="map map--loading">
          <p>Getting your location</p>
          <Icon pulse name="spinner" size="5x" />
        </div> */}
      </section>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
