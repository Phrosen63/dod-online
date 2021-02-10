module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    "prefer-default-export": 0,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
