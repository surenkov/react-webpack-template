/* eslint-disable import/no-extraneous-dependencies */
const formatter = require('eslint-friendly-formatter');
const autoprefixer = require('autoprefixer');

module.exports = {
  options: {
    context: '/',
    output: {},
    eslint: { formatter },
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ],
  },
};
