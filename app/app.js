const express = require('express'),
      logger = require('morgan')
      bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');

const app = express();

process.env.ENV = process.env.ENV || 'dev';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

// app.use('/api', apiRouter);

module.exports = app;
