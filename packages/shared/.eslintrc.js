module.exports = {
  extends: [
    '../../.eslintrc.js',
  ],
  ignore: [
    "./scripts/*.ts"
  ],
  env: {
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  }
}