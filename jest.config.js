/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },

  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/__mocks__/CSSStub.js',
    '@/(.*)': ['<rootDir>/src/$1'],
  },
};
