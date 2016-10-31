const superagentRequest = require('superagent');
const createToken = require('../utils/createToken');

const apiBaseURL = 'api.lvh.me:3000/v1';

class AuthController {
  static login(req, res) {
    const { email, password } = req.body;
    superagentRequest.post(`${apiBaseURL}/login`).send({ session: { email, password } })
              .then((superagentResponse) => {
                if (superagentResponse.status === 200) {
                  const user = superagentResponse.body;
                  req.session.currentUser = user;
                  const token = createToken(user);
                  res.cookie('token', token);
                  res.status(200).json(user);
                }
              })
              .catch(err => res.status(401).json(err));
  }
  static signup(req, res) {
    const { email, password } = req.body;
    if (email.length > 0 && password.length > 0) {
      superagentRequest.post(`${apiBaseURL}/signup`).send({ user: { email, password } })
                       .then((superagentResponse) => {
                         if (superagentResponse.status === 200) {
                           const user = superagentResponse.body;
                           res.status(200).json(user);
                         }
                       })
                       .catch(err => res.status(400).json(err));
    } else {
      res.status(400).end();
    }
  }
  static signout(req, res) {
    req.session.currentUser = null;
    res.clearCookie('token');
    res.status(204).end();
  }
}

module.exports = AuthController;
