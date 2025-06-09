import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));

        expect(result.current).toBe('initial');
    });

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 }
            }
        );

        expect(result.current).toBe('initial');

        // Change the value
        rerender({ value: 'updated', delay: 500 });

        // Value should still be the old one
        expect(result.current).toBe('initial');

        // Fast-forward time by less than delay
        act(() => {
            jest.advanceTimersByTime(250);
        });
        expect(result.current).toBe('initial');

        // Fast-forward time by remaining delay
        act(() => {
            jest.advanceTimersByTime(250);
        });
        expect(result.current).toBe('updated');
    });

    it('should reset debounce timer on rapid changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 }
            }
        );

        // Change value multiple times rapidly
        rerender({ value: 'change1', delay: 500 });
        act(() => {
            jest.advanceTimersByTime(250);
        });

        rerender({ value: 'change2', delay: 500 });
        act(() => {
            jest.advanceTimersByTime(250);
        });

        rerender({ value: 'final', delay: 500 });

        // Should still have initial value
        expect(result.current).toBe('initial');

        // Only after full delay should it update to final value
        act(() => {
            jest.advanceTimersByTime(500);
        });
        expect(result.current).toBe('final');
    });

    it('should handle different delay values', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 1000 }
            }
        );

        rerender({ value: 'updated', delay: 1000 });

        act(() => {
            jest.advanceTimersByTime(500);
        });
        expect(result.current).toBe('initial');

        act(() => {
            jest.advanceTimersByTime(500);
        });
        expect(result.current).toBe('updated');
    });

    it('should handle zero delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 0 }
            }
        );

        rerender({ value: 'updated', delay: 0 });

        act(() => {
            jest.advanceTimersByTime(0);
        });
        expect(result.current).toBe('updated');
    });
}); 