// This file runs after the test environment is initialized
// It's for setup that depends on the test environment being fully initialized
// Add any custom matchers or extensions to expect here
// Note: @testing-library/jest-dom is already imported in jest.setup.ts 

import '@testing-library/jest-dom';
import { QueryCache } from '@tanstack/react-query';

// Add polyfills for TextEncoder/TextDecoder if not available
if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

// Add polyfills for Fetch API and related Web APIs for MSW
if (typeof global.fetch === 'undefined') {
    const fetch = require('node-fetch');
    global.fetch = fetch;
    global.Headers = fetch.Headers;
    global.Request = fetch.Request;
    global.Response = fetch.Response;
}

// Add polyfills for ReadableStream and related APIs
if (typeof global.ReadableStream === 'undefined') {
    const { ReadableStream, WritableStream, TransformStream } = require('web-streams-polyfill');
    global.ReadableStream = ReadableStream;
    global.WritableStream = WritableStream;
    global.TransformStream = TransformStream;
}

// Add BroadcastChannel polyfill
if (typeof global.BroadcastChannel === 'undefined') {
    // Simple mock for BroadcastChannel
    class MockBroadcastChannel {
        constructor(name: string) { }
        postMessage(message: any) { }
        close() { }
        addEventListener(event: string, handler: any) { }
        removeEventListener(event: string, handler: any) { }
        dispatchEvent(event: any) { }
    }
    global.BroadcastChannel = MockBroadcastChannel as any;
}

// Add URL polyfill if needed
if (typeof global.URL === 'undefined') {
    const { URL, URLSearchParams } = require('url');
    global.URL = URL;
    global.URLSearchParams = URLSearchParams;
}

// Mock ResizeObserver
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

// Create a simple mock server that simulates MSW functionality
const createMockServer = () => {
    return {
        listen: (options?: any) => {
            console.log('✅ Mock MSW server started for testing');
        },
        close: () => {
            console.log('🔒 Mock MSW server closed');
        },
        resetHandlers: () => {
            // Reset any handlers if needed
        },
    };
};

// Setup console mocks
const consoleError = console.error;
const consoleWarn = console.warn;
let mockConsoleError: jest.SpyInstance;
let mockConsoleWarn: jest.SpyInstance;
let server: any;

beforeAll(async () => {
    // Initialize mock server instead of real MSW for now
    server = createMockServer();
    server.listen({ onUnhandledRequest: 'bypass' });

    // Mock console.warn to filter out specific messages
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation((...args) => {
        const message = typeof args[0] === 'string' ? args[0] : '';
        const shouldIgnoredMessages = [
            '[MSW] Warning: captured a request without a matching request handler:',
            '❌ MSW server could not be initialized:',
            '✅ Mock MSW server started for testing'
        ];
        if (shouldIgnoredMessages.some((s) => message.includes(s))) return;
        return consoleWarn.call(console, args);
    });

    // Mock console.error to filter out specific messages
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation((...args) => {
        const message = typeof args[0] === 'string' ? args[0] : '';
        const shouldIgnoredMessages = [
            'When testing, code that causes React state updates should be wrapped into act(...)',
            'Warning: The current testing environment is not configured to support act(...)',
            'Warning: React does not recognize the `%s` prop on a DOM element.',
            'Warning: Unknown event handler property `%s`. It will be ignored.'
        ];
        if (shouldIgnoredMessages.some((s) => message.includes(s))) return;
        return consoleError.call(console, args);
    });

    // Setup ResizeObserver mock
    window.ResizeObserver = ResizeObserver;

    // Setup matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });

    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        },
        writable: true
    });

    // Setup sessionStorage mock
    Object.defineProperty(window, 'sessionStorage', {
        value: {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        },
        writable: true
    });
});

afterAll(() => {
    mockConsoleWarn.mockRestore();
    mockConsoleError.mockRestore();
    if (server) {
        server.close();
    }
});

const queryCache = new QueryCache();

// Reset any request handlers that we may add during the tests
afterEach(() => {
    queryCache.clear();
    if (server) {
        server.resetHandlers();
    }
});

// Add structuredClone polyfill
global.structuredClone = (val) => JSON.parse(JSON.stringify(val)); 