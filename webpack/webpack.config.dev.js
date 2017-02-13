const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');

const APP_PATH = path.join(__dirname, '../app');
const ASSETS_PATH = path.join(__dirname, '../public/assets');
const PUBLIC_PATH = '/assets/';

const commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'react', 'stage-2'],
    },
    include: APP_PATH,
    exclude: /node_modules/,
  },
];

const client = {
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

const server = {
  name: 'server',
  context: APP_PATH,
  target: 'node',
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
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
