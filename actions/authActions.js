import AuthAPI from '../services/AuthAPI.js';

export function login({ email, password }) {
  return {
    type: 'LOGIN_REQUEST',
    payload: AuthAPI.login({ email, password }),
  };
}

export function logOut() {
  return { type: 'LOG_OUT' };
}
