import axios from 'axios';
import { apiRequest } from '../services/APIRequest';
import store from '../store';

const usersPath = 'http://localhost:3000/api/v1/users';

export function fetchUsers() {
  // const config = {
  //   headers: { 'Authorization': `Bearer ${store.getState().session.session.authToken}` },
  // };
  return {
    type: 'FETCH_USERS',
    payload: apiRequest.get(usersPath),
  };
}
