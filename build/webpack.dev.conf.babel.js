/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const utils = require('./utils');
const commons = require('./commons');
const baseWebpackConfig = require('./webpack.base.conf');


module.exports = merge({
  entry: {
    app: [
      'react-hot-loader/patch',
    ],
  },

  devtool: 'eval-source-map',

  module: {
    rules: utils.styleLoaders({ sourceMap: true }),
  },

  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    publicPath: '/',
    compress: true,
    host: '0.0.0.0',
    proxy: {},
  },

  output: {
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin(merge(commons, {
      options: {
        minimize: false,
        debug: true,
      },
    })),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
    }),

    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrors(),
  ],
}, baseWebpackConfig);
