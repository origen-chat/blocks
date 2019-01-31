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
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  modulePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/dist/',
    '<rootDir>/storybookDist',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  errorOnDeprecated: true,
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
