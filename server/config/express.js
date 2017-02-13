const express = require('express');
const path = require('path');

// Setup all Express configuration
module.exports = (app) => {
  app.set('port', (process.env.PORT || 3000));
  app.use(express.static(path.join(__dirname, '../../public')));
  console.log(`\nStarting Server (${process.env.NODE_ENV} environment mode)`); // eslint-disable-line
};
