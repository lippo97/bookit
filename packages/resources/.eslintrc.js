module.exports = {
  extends: [
    '../../.eslintrc.js',
  ],
  env: {
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off",
    "max-classes-per-file": "off",
    "class-methods-use-this": "off"
  }
}