const express = require('express');
const bodyParser = require('body-parser');
const { statusCodes, serverMessages } = require('./constants');

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
  const status = error.statusCode || statusCodes.SERVER_ERROR;
  const message = error.message || serverMessages.INTERNAL_ERROR;
  const data = error.data;
  res.status(status).json({ message, data: data });
});

module.exports = app;
