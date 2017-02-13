/*
 * Production [Webpack configuration](https://webpack.github.io/docs/configuration.html)
 */

const path = require('path');

// Paths
const APP_PATH = path.join(__dirname, '../app');
const ASSETS_PATH = path.join(__dirname, '../public/assets');

const commonExtensions = [
  '',
  '.js',
  '.jsx',
];

const commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
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

module.exports = [
  {
    // Client-side rendering configuration
    name: 'browser',
    context: APP_PATH,
    entry: {
      app: './client',
    },
    output: {
      path: ASSETS_PATH,
      filename: '[name].js',
      publicPath: '/assets/',
    },
    devtool: 'source-map',
    module: {
      loaders: commonLoaders,
    },
    resolve: {
      extensions: commonExtensions,
    },
  },
  {
    // Server-side rendering configuration
    name: 'server',
    target: 'node',
    context: APP_PATH,
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
      extensions: commonExtensions,
    },
  },
];
