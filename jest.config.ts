import type { Config } from 'jest';

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost/',
    },
    setupFilesAfterEnv: ['<rootDir>/__test__/src/setupAfterEnv.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/mocks/fileMock.js',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            useESM: true,
            extensionsToTreatAsEsm: ['.ts', '.tsx'],
        }],
        '^.+\\.(js|jsx)$': ['babel-jest', {
            presets: ['@babel/preset-env', '@babel/preset-react'],
        }],
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(msw|@mswjs)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['<rootDir>/__test__/**/*.test.[jt]s?(x)', '<rootDir>/__test__/**/*.spec.[jt]s?(x)'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{ts,tsx}',
        '!src/**/*.test.{ts,tsx}',
        '!src/**/__mocks__/**',
    ],
    coverageThreshold: {
        global: {
            branches: 40,
            functions: 40,
            lines: 40,
            statements: 40,
        },
    },
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
} satisfies Config; 