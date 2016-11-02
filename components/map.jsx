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
    this.getUserPosition();
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
      return (<div className="map">Map loading...</div>);
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
            defaultZoom={12}
            // defaultCenter={this.state.position}
            center={this.state.position}
          >
            <Marker
              position={this.state.position}
              icon={{
                url: 'http://simpleicon.com/wp-content/uploads/user1.svg',
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
            <Marker
              position={{ lat: 40.671, lng: -73.962 }}
              icon={{
                url: 'http://www.misskatecuttables.com/uploads/shopping_cart/7520/large_ice-cream-truck.png',
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
            <Marker
              position={{ lat: 40.681, lng: -73.952 }}
              icon={{
                url: 'http://www.misskatecuttables.com/uploads/shopping_cart/7520/large_ice-cream-truck.png',
                scaledSize: new google.maps.Size(32, 32),
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
