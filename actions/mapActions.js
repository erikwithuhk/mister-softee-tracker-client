export function addMarker({ id, marker }) {
  return {
    type: 'ADD_MARKER',
    payload: { id, marker },
  };
}

// export function setMarkerPosition() {
//   return {
//     type: 'LOGIN_REQUEST',
//     payload: new google.maps.LatLng(vendor.position_lat,vendor.position_lng)),
//   };
// }

// this.markers[vendor.id].setPosition(new google.maps.LatLng(vendor.position_lat,vendor.position_lng));
