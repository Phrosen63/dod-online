module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    "prefer-default-export": 0,
    "no-unused-vars": "warn",
    "vue/no-v-html": 0,
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
