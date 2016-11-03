import axios from 'axios';
import { apiRequest } from '../services/APIRequest';
import store from '../store';

const usersPath = 'http://localhost:3000/api/v1/users';

export function fetchUsers() {
  return {
    type: 'FETCH_USERS',
    payload: apiRequest.get(usersPath),
  };
}

export function updatePosition({ userID, lat, lng }) {
  console.log('test');
  return {
    type: 'UPDATE_POSITION',
    payload: apiRequest.patch(`${usersPath}/${userID}`, {
      user: {
        position_lat: lat,
        position_lng: lng,
      },
    }),
  };
}
