const config = require('./config');
const signale = require('signale');
const app = require('./app');

const server = app.listen(config.PORT, '0.0.0.0');

function onListing() {
  signale.success('Server listening on port:', config.PORT);
}

function onError(error) {
  signale.error('There was an error:', error);
}

server.on('listening', onListing);
server.on('error', onError);
