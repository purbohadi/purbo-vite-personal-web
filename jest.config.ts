import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/__tests__'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/__tests__/**/*.spec.ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: {
                    jsx: 'react-jsx',
                },
            }
        ]
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: {
                jsx: 'react-jsx',
            },
        },
        'import.meta': {
            env: {
                VITE_SERVICE_ID: 'test-service',
                VITE_TEMPLATE_ID: 'test-template',
                VITE_USER_ID: 'test-user'
            }
        }
    },
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    }
};

export default config; 