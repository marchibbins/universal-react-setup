const express = require('express');
const path = require('path');

// Setup all Express configuration
module.exports = (app) => {
  app.set('port', (process.env.PORT || 3000));

  // X-Powered-By header has no functional value
  // Keeping it makes it easier for an attacker to build the site's profile
  app.disable('x-powered-by');

  // TODO: Setup views
  // TODO: Setup sessions

  app.use(express.static(path.join(__dirname, '../../public')));

  /* eslint-disable no-console */
  console.log(`\nStarting Server (${process.env.NODE_ENV} environment mode)`);
};
