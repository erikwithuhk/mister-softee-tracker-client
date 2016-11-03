import React, { Component } from 'react';
import { Icon } from 'react-fa';

const propTypes = {
  // containerElementProps: React.PropTypes.object,
};

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
        this.setState({ position: { lat: latitude, lng: longitude } });
      });
    }
  }
  startPositionInterval() {
    const getUserPosition = setInterval(() => this.getUserPosition(), 500);
    this.setState({ userPositionIntervalID: getUserPosition });
  }
  clearPositionInterval() {
    clearInterval(this.state.userPositionIntervalID);
  }
  initializeMap() {
    this.map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 13,
      center: this.state.position,
    });
    this.createCurrentLocationMarker();
    this.createVendorLocationMarkers();
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
    this.state.vendorPositions.forEach((vendorPosition) => {
      new google.maps.Marker({
        map: this.map,
        position: vendorPosition,
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
      // <GoogleMapLoader
      //   containerElement={
      //     <section
      //       className="map"
      //       {...this.props.containerElementProps}
      //     />
      //   }
      //   googleMapElement={
      //     <GoogleMap
      //       defaultZoom={12}
      //       defaultCenter={this.state.position}
      //     >
      //       <Marker
      //         anchorPoint={new google.maps.Point(50, 32)}
      //         icon={{
      //           url: '../images/mister-softee-tracker_current-location-dot.svg',
      //           scaledSize: new google.maps.Size(64, 64),
      //         }}
      //         opacity={0.75}
      //         position={this.state.position}
      //       />
      //       <Marker
      //         position={{ lat: 40.671, lng: -73.962 }}
      //         icon={{
      //           url: '../images/mister-softee-tracker_truck-icon.svg',
      //           scaledSize: new google.maps.Size(50, 32),
      //         }}
      //       />
      //       <Marker
      //         position={{ lat: 40.681, lng: -73.952 }}
      //         icon={{
      //           url: '../images/mister-softee-tracker_truck-icon.svg',
      //           scaledSize: new google.maps.Size(50, 32),
      //         }}
      //       />
      //       <Marker
      //         position={{ lat: 40.631, lng: -73.982 }}
      //         icon={{
      //           url: '../images/mister-softee-tracker_truck-icon.svg',
      //           scaledSize: new google.maps.Size(50, 32),
      //         }}
      //       />
      //       <Marker
      //         position={{ lat: 40.651, lng: -73.992 }}
      //         icon={{
      //           url: '../images/mister-softee-tracker_truck-icon.svg',
      //           scaledSize: new google.maps.Size(50, 32),
      //         }}
      //       />
      //     </GoogleMap>
      //   }
      // />
    );
  }
}

Map.propTypes = propTypes;

export default Map;
