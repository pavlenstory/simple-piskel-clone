module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-new": "off",
    "no-shadow": "off",
    "prefer-destructuring": "off",
    "class-methods-use-this": "off"
  },
};
