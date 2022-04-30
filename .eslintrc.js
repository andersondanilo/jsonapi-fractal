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
    'plugin:unicorn/all'
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }]
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
