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
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/indent": "off",
    "implicit-arrow-linebreak": "off"
  }
};