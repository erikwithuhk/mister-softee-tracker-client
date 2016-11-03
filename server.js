if (!process.env) {
  require('dotenv').config();
}

process.env.ENV = process.env.ENV || 'dev';

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
