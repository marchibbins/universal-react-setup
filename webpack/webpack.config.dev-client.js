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
  name: 'browser',
  context: APP_PATH,
  entry: {
    app: ['./client'],
  },
  output: {
    path: ASSETS_PATH,
    filename: '[name].js',
    publicPath: '/assets/',
  },
  devtool: 'eval',
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
