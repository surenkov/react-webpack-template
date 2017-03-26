module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },

  plugins: [
    'flowtype',
    'react',
  ],

  extends: [
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'airbnb-base',
  ],

  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      },
    },
  },

  rules: {
    'no-confusing-arrow': ['error', { allowParens: true }],
    'import/extensions': ['error', 'always', { js: 'never', jsx: 'never' }],
  },
};
