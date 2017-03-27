/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    app: ['./src'],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(projectRoot, 'node_modules')],
    alias: {
      src: path.join(projectRoot, 'src'),
      components: path.join(projectRoot, 'src/components'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(projectRoot, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.join(projectRoot, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.html$/,
        use: ['raw-loader', 'extract-loader', {
          loader: 'html-loader',
          options: {
            minimize: false,
          },
        }],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
