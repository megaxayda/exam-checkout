// eslint-disable-next-line @typescript-eslint/no-var-requires
const lodash = require('lodash');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
};
