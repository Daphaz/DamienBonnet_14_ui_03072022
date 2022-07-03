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
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
};
