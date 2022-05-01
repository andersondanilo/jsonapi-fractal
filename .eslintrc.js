module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
  },
  root: true,
  env: {
    jest: true,
    node: true,
    browser: true
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:unicorn/all',
    'plugin:jsdoc/recommended'
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'unicorn/prefer-node-protocol': 'off',
    'jsdoc/require-jsdoc': ['error', { 'publicOnly': true }],
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off'
  },
  overrides: [
    {
      files: ['examples/*.js'],
      rules: {
        //'@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'unicorn/prefer-module': 'off',
      }
    }
  ]
}
