module.exports = {
  extends: [
    '../../.eslintrc.js',
  ],
  env: {
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  }
}