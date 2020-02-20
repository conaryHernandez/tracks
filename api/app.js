const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

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

module.exports = app;
