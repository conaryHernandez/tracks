const defaultConfiguration = require('./default');

const environment = process.env.NODE_ENV || 'development';
const environmentConfiguration = require(`./${environment}`).default;

const mergedConfig = {
  ...defaultConfiguration,
  ...environmentConfiguration
};

module.exports = mergedConfig;
