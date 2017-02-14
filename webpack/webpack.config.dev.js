/*
 * Development [Webpack configuration](https://webpack.github.io/docs/configuration.html)
 */

const path = require('path');
const webpack = require('webpack');

// Plugins
const WriteFilePlugin = require('write-file-webpack-plugin');

// Paths
const APP_PATH = path.join(__dirname, '../app');
const ASSETS_PATH = path.join(__dirname, '../public/assets');
const PUBLIC_PATH = '/assets/';

const commonLoaders = [
  {
    test: /\.js$/,
    loader: 'babel',
    query: {
      // Read more: http://babeljs.io/docs/plugins/#presets
      presets: [
        'es2015',
        'react',
        'stage-2', // TC39 categorises experimental proposals in stages
      ],
    },
    include: APP_PATH,
    exclude: /node_modules/,
  },
];

const client = {
  // Client-side rendering configuration
  name: 'client',
  context: APP_PATH,
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './client',
    ],
  },
  output: {
    filename: '[name].js',
    path: ASSETS_PATH,
    publicPath: PUBLIC_PATH,
  },
  devtool: 'eval',
  module: {
    loaders: commonLoaders,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

const server = {
  // Server-side rendering configuration
  name: 'server',
  target: 'node',
  context: APP_PATH,
  entry: {
    server: './server',
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2', // Export application module to be used by Express
    path: ASSETS_PATH,
    publicPath: PUBLIC_PATH,
  },
  module: {
    loaders: commonLoaders,
  },
  plugins: [
    // Server application needs to be written on change in dev mode
    // in order to ensure the latest is served without restarting Express
    new WriteFilePlugin(),
  ],
};

module.exports = {
  client,
  server,
  default: [
    client,
    server,
  ],
  PUBLIC_PATH,
};
