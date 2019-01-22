module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/storybookDist/**',
  ],
  coveragePathIgnorePatterns: [
    'node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/storybookDist/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  setupTestFrameworkScriptFile: './src/jest.setup.ts',
  modulePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/dist/',
    '<rootDir>/storybookDist',
  ],
  transform: {
    '^.+\\.(jsx?|tsx?)$': 'babel-jest',
  },
  errorOnDeprecated: true,
  watchPathIgnorePatterns: ['node_modules'],
};
