/*
 * Development [Webpack configuration](https://webpack.github.io/docs/configuration.html)
 */

const path = require('path');
const webpack = require('webpack');

// Plugins
const PostCSSAutoprefixer = require('autoprefixer');
const PostCSSMixins = require('postcss-mixins');
const PostCSSNested = require('postcss-nested');
const PostCSSSimpleVars = require('postcss-simple-vars');
const WriteFilePlugin = require('write-file-webpack-plugin');

// Paths
const APP_PATH = path.join(__dirname, '../app');
const ASSETS_PATH = path.join(__dirname, '../public/assets');
const PUBLIC_PATH = '/assets/';

// Loaders used by both client and server builds
const commonLoaders = [
  {
    test: /\.js$/,
    include: APP_PATH,
    loader: 'babel',
    query: {
      // Read more: http://babeljs.io/docs/plugins/#presets
      presets: [
        'es2015',
        'react',
        'stage-2', // TC39 categorises experimental proposals in stages
      ],
    },
  },
];

// Plugins used by both client and server builds
const commonPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(), // Assign module and chunk IDs by occurrence
  new webpack.NoErrorsPlugin(), // Don't compile assets when errors
];

// Configure [PostCSS](https://github.com/postcss/postcss)
const postCSSConfig = () => [
  PostCSSMixins(), // Global CSS mixins (must be before simple-vars and nested)
  PostCSSSimpleVars(), // Use Sass-like variables
  PostCSSNested(), // Unwrap Sass-like nested rules
  PostCSSAutoprefixer({ // Parse CSS and add vendor prefixes to rules etc
    browsers: ['last 2 versions'],
  }),
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
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        include: APP_PATH,
        // For development styles are included by JS modules
        loaders: [
          'style',
          'css?importLoaders=1',
          'postcss?sourceMap=inline', // See postCSSConfig
        ],
      },
    ]),
  },
  plugins: commonPlugins.concat([
    // Enable client-side hot module replacement
    new webpack.HotModuleReplacementPlugin(),
  ]),
  postcss: postCSSConfig,
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
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        include: APP_PATH,
        // Styles are rendered inline by client webpack and not in server application HTML,
        // so compiled CSS bundle will become outdated during development,
        // however app/server.js only includes CSS bundle link in production,
        // meaning injected style tags are honoured solely (i.e. rules aren't doubled)
        loader: 'css',
      },
    ]),
  },
  plugins: commonPlugins.concat([
    // Server application needs to be written on change in dev mode
    // in order to ensure the latest is served without restarting Express
    new WriteFilePlugin(),
  ]),
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
