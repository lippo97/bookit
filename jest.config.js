const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@asw-project/shared/(.*)$': resolve(__dirname, './packages/shared/src/$1'),
  },
};
