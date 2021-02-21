module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    "prefer-default-export": 0,
    "no-unused-vars": "warn",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
