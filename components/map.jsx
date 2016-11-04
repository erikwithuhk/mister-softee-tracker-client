import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';

import { updatePosition } from '../actions/userActions';
// import { saveMap, addMarker } from '../actions/mapActions';
import { fetchVendors } from '../actions/vendorActions';

const propTypes = {
  // containerElementProps: React.PropTypes.object,
};

@connect((store) => {
  return {
    session: store.session.session,
    position: store.user.position,
    // map: store.map,
    vendors: store.vendor.vendors,
  };
})

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // mapRendered: false,
      // markers: {},
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
      if (this.map.getCenter() === this.defaultCenter && this.state.position) {
        this.createCurrentPositionMarker();
        this.recenterMap();
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
      center: this.defaultCenter,
      draggable: true,
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
    this.setState({ currentPositionMarker });
  }
  setCurrentPositionMarker() {
    this.state.currentPositionMarker.setPosition(this.state.position);
  }
  // getMarkers() {
  //   this.props.vendors.forEach((vendor) => {
  //     if (this.state.markers.hasOwnProperty(vendor.id)) {
  //       this.state.markers[vendor.id].setPosition(new google.maps.LatLng(vendor.position_lat,vendor.position_lng));
  //     } else {
  //       const marker = new google.maps.Marker({
  //         map: this.map,
  //         anchorPoint: new google.maps.Point(0, 0),
  //         position: new google.maps.LatLng(vendor.position_lat,vendor.position_lng),
  //         title: `${vendor.id}`,
  //         icon: {
  //           url: '../images/mister-softee-tracker_truck-icon.svg',
  //           scaledSize: new google.maps.Size(50, 32),
  //         },
  //       });
  //       const newMarkerState = this.state.markers;
  //       newMarkerState[vendor.id] = marker;
  //       this.setState(newMarkerState);
  //       // this.props.dispatch(addMarker({ id, marker }));
  //     }
  //   });
  // }
  recenterMap() {
    this.map.setCenter(this.state.position);
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
