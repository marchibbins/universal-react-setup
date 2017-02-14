const path = require('path');

const SERVER_BUILD_PATH = path.resolve(__dirname, '../../public/assets/server.js');

let renderApplication = require(SERVER_BUILD_PATH); // eslint-disable-line

module.exports = (app) => {
  // Send all requests to our server-side application handler, which will render our application
  // or respond appropriately otherwise, e.g. with redirections or error messages
  if (process.env.NODE_ENV === 'development') {
    // In development mode we want to require (and nuke the cache) with every request
    // to ensure that the latest built code is sent over the wire (to ensure checksum match)
    app.get('*', (req, res) => {
      renderApplication = require(SERVER_BUILD_PATH); // eslint-disable-line
      delete require.cache[SERVER_BUILD_PATH];
      renderApplication(req, res);
    });
  } else {
    app.get('*', renderApplication);
  }
};
