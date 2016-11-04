import AuthAPI from '../services/AuthAPI.js';

export function signup({ email, password, isVendor }) {
  const type = isVendor ? 'Vendor' : 'Customer';
  return {
    type: 'SIGNUP_REQUEST',
    payload: AuthAPI.signup({ email, password, type }),
  };
}

export function login({ email, password }) {
  return {
    type: 'LOGIN_REQUEST',
    payload: AuthAPI.login({ email, password }),
  };
}

export function logOut() {
  return { type: 'LOG_OUT' };
}
