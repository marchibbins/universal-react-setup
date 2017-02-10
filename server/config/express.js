const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.set('port', (process.env.PORT || 3000));
  app.use(express.static(path.join(__dirname, '../../public')));
  console.log(`\nStarting Server (${process.env.NODE_ENV} environment mode)`); // eslint-disable-line
};
