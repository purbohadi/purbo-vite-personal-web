import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '@/hooks/useWindowSize';

// Mock window dimensions
const mockWindowSize = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
    });
};

describe('useWindowSize', () => {
    beforeEach(() => {
        // Set initial window size
        mockWindowSize(1024, 768);
    });

    afterEach(() => {
        // Clean up event listeners
        window.removeEventListener('resize', jest.fn());
    });

    it('should return initial window size', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);
    });

    it('should update size when window is resized', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);

        // Simulate window resize
        act(() => {
            mockWindowSize(1280, 720);
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(1280);
        expect(result.current.height).toBe(720);
    });

    it('should handle multiple resize events', () => {
        const { result } = renderHook(() => useWindowSize());

        // First resize
        act(() => {
            mockWindowSize(800, 600);
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(800);
        expect(result.current.height).toBe(600);

        // Second resize
        act(() => {
            mockWindowSize(1920, 1080);
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(1920);
        expect(result.current.height).toBe(1080);
    });

    it('should handle mobile dimensions', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            mockWindowSize(375, 667);
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(375);
        expect(result.current.height).toBe(667);
    });

    it('should clean up event listener on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() => useWindowSize());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        removeEventListenerSpy.mockRestore();
    });
}); 