module.exports = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    setupFiles: ['core-js'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    modulePathIgnorePatterns: ['dist'],
    collectCoverageFrom: ['src/**/*.ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '.*': 'babel-jest',
    },
};
