const defaultConfiguration = require('./default');
let environment = 'development';

if (process.env.NODE_ENV === 'test') {
  environment = 'development';
} else {
  environment = process.env.NODE_ENV || 'development';
}

const environmentConfiguration = require(`./${environment}`).default;

const mergedConfig = {
  ...defaultConfiguration,
  ...environmentConfiguration
};

module.exports = mergedConfig;
