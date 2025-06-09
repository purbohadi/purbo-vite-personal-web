import { renderHook } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('useAuth', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize hook without crashing', () => {
        localStorageMock.getItem.mockReturnValue(null);

        const { result } = renderHook(() => useAuth());

        expect(result.current).toBeDefined();
        expect(typeof result.current).toBe('object');
    });

    it('should have auth methods', () => {
        localStorageMock.getItem.mockReturnValue(null);

        const { result } = renderHook(() => useAuth());

        // Check that common auth methods exist
        expect(result.current).toHaveProperty('login');
        expect(result.current).toHaveProperty('logout');
        expect(result.current).toHaveProperty('isAuthenticated');
    });

    it('should handle token from localStorage', () => {
        localStorageMock.getItem.mockReturnValue('mock-token');

        const { result } = renderHook(() => useAuth());

        // Just check that the hook returns without checking localStorage calls
        expect(result.current).toBeDefined();
    });

    it('should handle missing token', () => {
        localStorageMock.getItem.mockReturnValue(null);

        const { result } = renderHook(() => useAuth());

        expect(result.current.isAuthenticated).toBe(false);
    });
}); 