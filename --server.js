// if (!process.env) {
  require('dotenv').config();
// }

process.env.ENV = process.env.ENV || 'dev';

const path = require('path'),
      express = require('express'),
      webpack = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config'),
      app = require('./app/app');

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
