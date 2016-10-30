const express = require('express'),
      logger = require('morgan');

const app = express();

app.use(logger('dev'));

module.exports = app;
