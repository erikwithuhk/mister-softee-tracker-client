import request from 'superagent';

const loginPath = 'api/authenticate';

class AuthApi {
  static login({ email, password }) {
    return request.post(loginPath)
                  .send({ email, password })
                  .then(response => response.body)
                  .catch(err => err);
  }
}

export default AuthApi;
