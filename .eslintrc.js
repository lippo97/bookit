module.exports = {
  root: true,
  ignorePatterns: [
    'dist/**/*.d.ts',
    '**/.eslintrc.js',
    '**/.prettierrc.js',
  ],
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
};