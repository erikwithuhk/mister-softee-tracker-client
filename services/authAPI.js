import request from 'superagent';

const loginPath = 'api/authenticate';

class AuthApi {
  static login({ username, password }) {
    return request.post(loginPath)
                  .send({ username, password })
                  .then(response => response.body)
                  .catch(err => err);
  }
}

export default AuthApi;
