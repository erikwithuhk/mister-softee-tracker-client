if (!process.env) {
  require('dotenv').config();
}

process.env.ENV = process.env.ENV || 'dev';

const express = require('express');
const path = require('path');

const app = express();

function httpsRedirect(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    return next();
  }
  return next();
}

app.use(httpsRedirect);

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
