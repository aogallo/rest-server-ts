// import { pathsToModuleNameMapper } from 'ts-jest'
import { type JestConfigWithTsJest } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  roots: ['.'],
  // extensionsToTreatAsEsm: ['.ts'],
  // modulePaths: [compilerOptions.baseUrl],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
    '^@controllers/(.*)$': ['./src/controllers/$1'],
    '^@core/(.*)$': ['./src/core/$1'],
    '^@entities/(.*)$': ['./src/entities/$1'],
    '^@routes/(.*)$': ['./src/routes/$1'],
  },
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
}

export default jestConfig
