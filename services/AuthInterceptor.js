import axios from 'axios';
import store from '../store';

export default function () {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getState().session.authToken}`;
    return config;
  });
}
