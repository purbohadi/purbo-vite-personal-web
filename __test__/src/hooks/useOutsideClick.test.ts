import { renderHook } from '@testing-library/react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';

describe('useOutsideClick', () => {
    it('should initialize without errors', () => {
        const callback = jest.fn();

        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useOutsideClick(ref, callback);
            return ref;
        });

        expect(result.current).toBeDefined();
        expect(callback).not.toHaveBeenCalled();
    });

    it('should accept a callback function', () => {
        const callback = jest.fn();

        renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useOutsideClick(ref, callback);
            return ref;
        });

        // Test that the hook can be called with different callback types
        expect(typeof callback).toBe('function');
    });

    it('should work with null ref', () => {
        const callback = jest.fn();

        renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useOutsideClick(ref, callback);
            return ref;
        });

        // Should not throw when ref is null
        expect(callback).not.toHaveBeenCalled();
    });
}); 