import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('useMediaQuery', () => {
    beforeEach(() => {
        (window.matchMedia as jest.Mock).mockClear();
    });

    it('should return false for non-matching media query', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: false,
            media: '(min-width: 768px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

        expect(result.current).toBe(false);
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('should return true for matching media query', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: true,
            media: '(min-width: 768px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

        expect(result.current).toBe(true);
    });

    it('should handle different media queries', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 640px)'));

        expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 640px)');
        expect(typeof result.current).toBe('boolean');
    });
}); 