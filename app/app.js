const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');

const app = express();

process.env.ENV = process.env.ENV || 'dev';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/api/v1', apiRouter);

module.exports = app;
