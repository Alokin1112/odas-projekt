import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
  randomize: true,
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  testMatch: [
    "**/?(*.)+(spec).ts"
  ],
  moduleNameMapper: {
    "@env/(.*)": "<rootDir>/src/environments/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
    "@modules/(.*)": "<rootDir>/src/app/modules/$1",
    "@layout/(.*)": "<rootDir>/src/app/layout/$1",
    "@assets/(.*)": "<rootDir>/src/assets/$1",
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "uuid": require.resolve('uuid'),
  },
};

export default config; 
