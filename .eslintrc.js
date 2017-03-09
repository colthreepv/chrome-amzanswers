module.exports = {
  // "env": {
  //   "browser": true,
  //   "commonjs": true,
  //   "es6": true
  // },
  // "extends": "eslint:recommended",
  // "parser": "babel-eslint",
  // "parserOptions": {
  //   "ecmaFeatures": {
  //     "experimentalObjectRestSpread": true,
  //     "jsx": true
  //   },
  //   "sourceType": "module"
  // },
  extends: 'standard',
  env: {
    browser: true,
  },
  rules: {
    'comma-dangle': [2, 'always-multiline']
  }
};
