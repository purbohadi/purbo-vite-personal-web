import '@testing-library/jest-dom';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
        }
    }
}

// Mock import.meta.env globally for Jest
globalThis.import = {
    meta: {
        env: {
            VITE_SERVICE_ID: 'test-service',
            VITE_TEMPLATE_ID: 'test-template',
            VITE_USER_ID: 'test-user'
        }
    }
};

Object.defineProperty(globalThis, 'import', {
    value: globalThis.import,
    writable: true
});

// Mock process.env
process.env = {
    ...process.env,
    VITE_SERVICE_ID: 'test-service',
    VITE_TEMPLATE_ID: 'test-template',
    VITE_USER_ID: 'test-user'
};

// Mock IntersectionObserver for JSDOM
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
    class MockIntersectionObserver {
        constructor() { }
        observe() { }
        unobserve() { }
        disconnect() { }
        takeRecords() { return []; }
    }
    // @ts-ignore
    window.IntersectionObserver = MockIntersectionObserver;
    // @ts-ignore
    global.IntersectionObserver = MockIntersectionObserver;
} 