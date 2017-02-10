const express = require('express');
const webpack = require('webpack');

const app = express();

const DEV_MODE = process.env.NODE_ENV === 'development';

if (DEV_MODE) {
  /* eslint-disable global-require */
  const config = require('../webpack/webpack.config.dev-client.js');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  /* eslint-enable global-require */
}

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(app.get('port'));
