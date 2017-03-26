/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
const path = require('path');
const isString = require('lodash/isString');
const map = require('lodash/map');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssLoaders = (options) => {
  options = options || {};
  function generateLoaders(loaders) {
    const sourceLoader = loaders.map((loader) => {
      if (isString(loader)) {
        loader = [loader, {}];
      }
      loader = {
        loader: loader[0].endsWith('-loader') ? loader : `${loader[0]}-loader`,
        options: Object.assign({}, loader[1]),
      };
      Object.assign(loader.options, { sourceMap: options.sourceMap });
      return loader;
    });

    if (options.extract) {
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: sourceLoader,
      });
    }
    sourceLoader.splice(0, 0, { loader: 'vue-style-loader' });
    return sourceLoader;
  }

  return {
    css: generateLoaders(['css', 'postcss']),
    postcss: generateLoaders(['css', 'postcss']),
    less: generateLoaders(['css', 'postcss', 'less']),
    sass: generateLoaders(['css', 'postcss', ['sass', {
      indentedSyntax: true,
      includePaths: [path.resolve(__dirname, '../')],
    }]]),
    scss: generateLoaders(['css', 'postcss', ['sass', {
      includePaths: [path.resolve(__dirname, '../')],
    }]]),
    stylus: generateLoaders(['css', 'postcss', 'stylus']),
    styl: generateLoaders(['css', 'postcss', 'stylus']),
  };
};

const styleLoaders = options => map(
  cssLoaders(options),
  (loader, extension) => ({
    test: new RegExp(`\\.${extension}$`),
    use: loader,
  }),
);

module.exports = {
  cssLoaders,
  styleLoaders,
};
