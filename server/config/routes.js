const path = require('path');

const SERVER_BUILD_PATH = path.resolve(__dirname, '../../public/assets/server.js');
const renderApplication = require(SERVER_BUILD_PATH).default; // eslint-disable-line

module.exports = (app) => {
  app.get('*', renderApplication);
};
