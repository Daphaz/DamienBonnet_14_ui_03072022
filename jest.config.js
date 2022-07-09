const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  roots: ['<rootDir>/lib'],
  collectCoverageFrom: ['lib/**/*.{js,jsx,ts,tsx}', '!lib/**/*.d.ts'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/lib/setupTests.ts'],
  testMatch: [
    '<rootDir>/lib/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/lib/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
};
