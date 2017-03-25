const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const projectRoot = path.resolve(__dirname, './');
const commonOptions = {
  context: '/',
  output: {
    publicPath: '/',
  },
  postcss: [
    /* eslint-disable global-require */
    require('autoprefixer')({
      browsers: ['last 2 versions'],
    }),
  ],
};

const cssLoaders = ['css-loader', 'postcss-loader'];
const sassLoaders = [...cssLoaders, 'sass-loader'];

const runtime = {
  development: {
    devtool: '#eval-source-map',
    entry: {
      app: ['react-hot-loader/patch'],
    },

    devServer: {
      publicPath: '/',
      compress: true,
      host: '0.0.0.0',
      proxy: { },
    },

    output: {
      publicPath: '/',
    },

    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', ...cssLoaders] },
        { test: /\.scss$/, use: ['style-loader', ...sassLoaders] },
      ],
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          ...commonOptions,
          minimize: false,
          debug: true,
        },
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        inject: true,
      }),

      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new FriendlyErrors(),
    ],
  },

  production: {
    devtool: '#cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract(cssLoaders),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract(sassLoaders),
        },
      ],
    },

    output: {
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[id].[chunkhash].js',
      publicPath: '/static/',
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          ...commonOptions,
          minimize: true,
          debug: false,
        },
      }),

      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
        },
      }),

      new ExtractTextPlugin({
        filename: 'css/[name].[contenthash:7].css',
        allChunks: true,
      }),

      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        chunksSortMode: 'dependency',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, './node_modules'),
            ) === 0
          );
        },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor'],
      }),
    ],
  },
};

module.exports = merge({
  entry: {
    app: [
      'babel-polyfill',
      './src/index.jsx',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash:7].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(__dirname, './node_modules')],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
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
          name: 'static/front/assets/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/front/assets/fonts/[name].[hash:7].[ext]',
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
}, runtime[process.env.NODE_ENV]);
