const path = require('path');

const APP_PATH = path.join(__dirname, '../app');
const ASSETS_PATH = path.join(__dirname, '../public/assets');

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

module.exports = {
  name: 'server',
  context: APP_PATH,
  target: 'node',
  entry: {
    server: './server',
  },
  output: {
    path: ASSETS_PATH,
    filename: 'server.js',
    publicPath: '/assets/',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: commonLoaders,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'app', 'node_modules',
    ],
  },
};
