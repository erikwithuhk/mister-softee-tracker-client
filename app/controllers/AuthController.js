const superagent = require('superagent');

class AuthController {
  static login(req, res) {
    const baseURL = 'api.lvh.me:3000/v1';
    const { email, password } = req.body;

    superagent.post(`${baseURL}/login`).send({ session: { email, password } })
              .then(response => res.status(200).json(response.body))
              .catch(err => res.status(500).json(err));
  }
}

module.exports = AuthController;
