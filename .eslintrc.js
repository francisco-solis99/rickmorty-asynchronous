module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': ['error', 'never']
  }
};
