const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    // ref. https://github.com/facebook/jest/issues/12036#issuecomment-979219710
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
}

module.exports = createJestConfig(customJestConfig)
