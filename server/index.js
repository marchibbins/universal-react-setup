/* eslint-disable global-require */

const express = require('express');
const webpack = require('webpack');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const WebpackDevMiddleware = require('webpack-dev-middleware');
  const WebpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack/webpack.config.dev.js');

  const clientWebpack = webpack(config.client);
  const serverWebpack = webpack(config.server);

  // Rebuild server-side to ensure fresh bundle is sent down the pipe
  app.use(WebpackDevMiddleware(serverWebpack, {
    noInfo: true,
  }));

  // Update client-side bundle for dev server
  app.use(WebpackDevMiddleware(clientWebpack, {
    noInfo: true,
    publicPath: config.PUBLIC_PATH,
  }));

  // Support hot-reloading for client-side application
  app.use(WebpackHotMiddleware(clientWebpack));
}

// Bootstrap application settings and routes
require('./config/express')(app);
require('./config/routes')(app);

app.listen(app.get('port'));
