import axios from 'axios';

const loginPath = 'http://localhost:3000/api/v1/authenticate';

class AuthApi {
  static login({ email, password }) {
    return axios.post(loginPath, { user: { email, password } })
                .then(response => response.data)
                .catch(err => err);
  }
}

export default AuthApi;
