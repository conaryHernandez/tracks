const express = require('express');
const bodyParser = require('body-parser');
const signale = require('signale');
const config = require('./config');
require('dotenv').config();

const app = express();
const tracksRoutes = require('./modules/tracks/tracksRoutes');

app.use(bodyParser.json());

// CORS enabled
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(tracksRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data: data });
});

const server = app.listen(config.PORT, '0.0.0.0');

function onListing() {
  signale.success('Server listening on port:', config.PORT);
}

function onError(error) {
  signale.error('There was an error:', error);
}

server.on('listening', onListing);
server.on('error', onError);
