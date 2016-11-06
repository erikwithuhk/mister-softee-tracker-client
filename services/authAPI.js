import axios from 'axios';

const signupPath = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/signup';
const loginPath = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/login';

class AuthApi {
  static signup({ email, password, type = 'Customer' }) {
    return axios.post(signupPath, { user: { email, password, type } })
                .then(response => response.data)
                .catch(err => err);
  }
  static login({ email, password }) {
    return axios.post(loginPath, { user: { email, password } })
                .then(response => response.data)
                .catch(err => err);
  }
}

export default AuthApi;
