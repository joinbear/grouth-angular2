'use strict';

const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const programName       = 'account'; // change the name of program
const appSrc            = './src/apps/'  + programName + '/index';
const appDist           = './dist/apps/' + programName + '/index';
const coreDist          = './dist/core/';
const coreSrc           = './src/core/';
const polyfillsDist     = coreDist + 'polyfills';
const vendorDist        = coreDist + 'vendor';
const polyfillsSrc      = coreSrc + 'polyfills';
const vendorSrc         = coreSrc + 'vendor';
const templateSrc       = './src/apps/'  + programName + '/index.html';
const templateSDist     = './dist/apps/'  + programName + '/index.html';
// config the entry files
const entry             = {};
entry[polyfillsDist]    = polyfillsSrc;
entry[vendorDist]       = vendorSrc;
entry[appDist]          = appSrc;

/**
 * [_root description]
 * @type {[type]}
 */
const _root = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  entry: entry,
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html'
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      //   loader: 'file?name=assets/[name].[hash].[ext]'
      // },
      // {
      //   test: /\.css$/,
      //   exclude: root('src', 'apps'),
      //   loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      // },
      // {
      //   test: /\.css$/,
      //   include: root('src', 'apps'),
      //   loader: 'raw'
      // }
    ]
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.ts'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: templateSrc,
      filename: templateSDist,
      title : '认购上账',
      hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [appDist, vendorDist, polyfillsDist]
    }),
  ]
};

