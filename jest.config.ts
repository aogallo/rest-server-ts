// import { pathsToModuleNameMapper } from 'ts-jest'
import { type JestConfigWithTsJest } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  roots: ['.'],
  // extensionsToTreatAsEsm: ['.ts'],
  // modulePaths: [compilerOptions.baseUrl],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
    '@controllers/(.*)$': ['<rootDir>/src/controllers/$1'],
    '@core/(.*)$': ['<rootDir>/src/core/$1'],
    '@entities/(.*)$': ['<rootDir>/src/entities/$1'],
    '@routes/(.*)$': ['<rootDir>/src/routes/$1'],
    '@schemas/(.*)$': ['<rootDir>/src/schemas/$1'],
  },
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true,
  testTimeout: 50000,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node/modules', '/tests/'],
}

export default jestConfig
