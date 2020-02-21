const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const serverMessages = {
  SUCCESS: 'success',
  INTERNAL_ERROR: 'Internal Server Error',
  NOT_FOUND: 'Not found'
};

module.exports = { statusCodes, serverMessages };
