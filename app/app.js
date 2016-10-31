const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const apiRouter = require('./routes/apiRouter.js');

const app = express();

process.env.ENV = process.env.ENV || 'dev';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
}));

app.use(logger('dev'));

app.use('/api/v1', apiRouter);

module.exports = app;
