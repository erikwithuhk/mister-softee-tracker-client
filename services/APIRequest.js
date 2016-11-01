import axios from 'axios';
import store from '../store';

export const apiRequest = axios.create();

apiRequest.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.getState().session.session.authToken}`;
  return config;
});
