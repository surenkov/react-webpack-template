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
    'jsx-a11y',
    'react',
  ],

  extends: [
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'airbnb',
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
  },
};
