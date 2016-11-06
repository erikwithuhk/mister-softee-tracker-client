import axios from 'axios';
import { apiRequest } from '../services/APIRequest';

const usersPath = 'http://mister-softee-tracker-api.herokuapp.com/api/v1/users';

export function fetchUsers() {
  return {
    type: 'FETCH_USERS',
    payload: apiRequest.get(usersPath),
  };
}

export function updatePosition({ userID, lat, lng }) {
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
