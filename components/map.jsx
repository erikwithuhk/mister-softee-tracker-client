import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';

import { updatePosition } from '../actions/userActions';
import { fetchVendors } from '../actions/vendorActions';

const propTypes = {
  // containerElementProps: React.PropTypes.object,
};

@connect((store) => {
  return {
    session: store.session.session,
    position: store.user.position,
    vendors: store.vendor.vendors,
  };
})

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRendered: false,
      position: null,
      vendorPositions: [
        { lat: 40.671, lng: -73.962 },
        { lat: 40.681, lng: -73.952 },
        { lat: 40.631, lng: -73.982 },
        { lat: 40.651, lng: -73.992 },
      ],
    };
  }
  componentDidMount() {
    this.startPositionInterval();
  }
  componentWillUnmount() {
    this.clearPositionInterval();
  }
  getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (this.props.session.userID) {
          this.props.dispatch(updatePosition({
            userID: this.props.session.userID,
            lat: latitude,
            lng: longitude,
          }));
        }
        this.setState({ position: { lat: latitude, lng: longitude } });
      });
    }
  }
  startPositionInterval() {
    const getPositions = setInterval(() => {
      this.getUserPosition()
      this.props.dispatch(fetchVendors());
      this.createVendorLocationMarkers();
    }, 1000);
    this.setState({ positionIntervalID: getPositions });
  }
  clearPositionInterval() {
    clearInterval(this.state.positionIntervalID);
  }
  initializeMap() {
    this.map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 13,
      center: this.state.position,
      draggable: true,
    });
    this.createCurrentLocationMarker();
    this.setState({ mapRendered: true });
  }
  createCurrentLocationMarker() {
    new google.maps.Marker({
      map: this.map,
      position: this.state.position,
      anchorPoint: new google.maps.Point(0, 0),
      icon: {
        url: '../images/mister-softee-tracker_current-location-dot.svg',
        scaledSize: new google.maps.Size(64, 64),
      },
      opacity: 0.75,
    });
  }
  createVendorLocationMarkers() {
    this.props.vendors.forEach((vendor) => {
      new google.maps.Marker({
        map: this.map,
        position: {
          lat: vendor.position_lat,
          lng: vendor.position_lng,
        },
        anchorPoint: new google.maps.Point(0, 0),
        icon: {
          url: '../images/mister-softee-tracker_truck-icon.svg',
          scaledSize: new google.maps.Size(50, 32),
        },
      });
    });
  }
  recenterMap() {
    this.map.setCenter(this.state.position);
  }
  render() {
    if (!this.state.position) {
      return (
        <section className="map map--loading">
          <p>Getting your location</p>
          <Icon pulse name="spinner" size="5x" />
        </section>
      );
    } else if (!this.state.mapRendered) {
      this.initializeMap();
    }
    return (
      <section className="map" />
    );
  }
}

Map.propTypes = propTypes;

export default Map;
