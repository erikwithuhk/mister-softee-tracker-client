import axios from 'axios';
import interceptor from '../services/AuthInterceptor';
import store from '../store';

const usersPath = 'http://localhost:3000/api/v1/users';

export function fetchUsers() {
  const config = {
    headers: { 'Authorization': `Bearer ${store.getState().session.session.authToken}` },
  };
  console.log(config);
  return {
    type: 'FETCH_USERS',
    payload: axios.get(usersPath, config),
  };
}
