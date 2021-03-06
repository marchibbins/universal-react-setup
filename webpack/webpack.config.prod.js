/*
 * Production [Webpack configuration](https://webpack.github.io/docs/configuration.html)
 */

const path = require('path');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCSSAutoprefixer = require('autoprefixer');
const PostCSSMixins = require('postcss-mixins');
const PostCSSNested = require('postcss-nested');
const PostCSSSimpleVars = require('postcss-simple-vars');

// Paths
const APP_PATH = path.join(__dirname, '../app');
const ASSETS_PATH = path.join(__dirname, '../public/assets');

// Loaders used by both client and server builds to transform files
// Read more [Webpack Loaders](https://webpack.github.io/docs/loaders.html)
const commonLoaders = [
  {
    test: /\.js$/,
    include: APP_PATH,
    loader: 'babel', // Transpile ES6 -> ES5 with [Babel](https://babeljs.io/)
    query: {
      // Read more: http://babeljs.io/docs/plugins/#presets
      presets: [
        'es2015',
        'react',
        'stage-2', // TC39 categorises experimental proposals in stages
      ],
    },
  },
  {
    test: /\.css$/,
    include: APP_PATH,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader'),
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

// Plugins used by both client and server builds
// Read more [Webpack plugins](https://webpack.github.io/docs/list-of-plugins.html)
const commonPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(), // Assign module and chunk IDs by occurrence
  new webpack.NoErrorsPlugin(), // Don't compile assets when errors
  new webpack.DefinePlugin({ // Create global constants for use in JS
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.DedupePlugin(),
  new ExtractTextPlugin('styles.css'), // In production each CSS chunk is extracted to a separate CSS output ffile
  new webpack.optimize.UglifyJsPlugin({ // Minify Javascript
    compress: {
      warnings: false,
    },
  }),
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
      filename: 'bundle.js',
      sourceMapFilename: 'bundle.map.js',
      publicPath: '/assets/',
    },
    devtool: 'source-map',
    module: {
      loaders: commonLoaders,
    },
    plugins: commonPlugins,
    postcss: postCSSConfig,
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
    plugins: commonPlugins,
    postcss: postCSSConfig,
  },
];
