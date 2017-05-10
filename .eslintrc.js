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

  plugins: ['flowtype'],

  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
  ],

  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      },
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },

  rules: {
    'no-confusing-arrow': ['error', { allowParens: true }],
    'import/extensions': ['error', 'always', { js: 'never', jsx: 'never' }],
    'quote-props': ['error', 'as-needed', { numbers: true }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
    }],
    'jsx-a11y/no-static-element-interactions': 0,
    'react/no-unused-prop-types': 0,
  },
};
