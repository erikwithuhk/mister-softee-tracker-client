import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { Icon } from 'react-fa';

const propTypes = {
  containerElementProps: React.PropTypes.object,
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // position: {
      //   lat: 40.678,
      //   lng: -73.944,
      // },
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.getUserPosition();
    }, 500);
  }
  getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ position: { lat: latitude, lng: longitude } });
      });
    }
  }
  render() {
    if (!this.state.position) {
      return (
        <div className="map map--loading">
          <p>Getting your location</p>
          <Icon pulse name="spinner" size="5x" />
        </div>
      );
    }
    return (
      <GoogleMapLoader
        containerElement={
          <section
            className="map"
            {...this.props.containerElementProps}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={15}
            defaultCenter={this.state.position}
          >
            <Marker
              anchorPoint={new google.maps.Point(50, 32)}
              icon={{
                url: '../images/mister-softee-tracker_current-location-dot.svg',
                scaledSize: new google.maps.Size(64, 64),
              }}
              opacity={0.75}
              position={this.state.position}
            />
            <Marker
              position={{ lat: 40.671, lng: -73.962 }}
              icon={{
                url: '../images/mister-softee-tracker_truck-icon.svg',
                scaledSize: new google.maps.Size(50, 32),
              }}
            />
            <Marker
              position={{ lat: 40.681, lng: -73.952 }}
              icon={{
                url: '../images/mister-softee-tracker_truck-icon.svg',
                scaledSize: new google.maps.Size(50, 32),
              }}
            />
          </GoogleMap>
        }
      />
    );
  }
}

Map.propTypes = propTypes;

export default Map;
