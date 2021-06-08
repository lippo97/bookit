module.exports = {
  env: {
    "es2021": true,
  },
  root: true,
  ignorePatterns: [
    'dist/**/*.d.ts',
    '*.js',
  ],
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
};