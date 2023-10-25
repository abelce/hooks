/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/src/$1'],
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  setupFiles: ['./__mocks__/myworker.worker.js', './__mocks__/dom.js'],
};
