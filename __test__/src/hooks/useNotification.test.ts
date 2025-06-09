import { renderHook, act } from '@testing-library/react';
import { useNotification } from '@/hooks/useNotification';

// Mock setTimeout
jest.useFakeTimers();

describe('useNotification', () => {
    beforeEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should return notification functions and empty notifications initially', () => {
        const { result } = renderHook(() => useNotification());

        expect(result.current.notifications).toEqual([]);
        expect(typeof result.current.addNotification).toBe('function');
        expect(typeof result.current.removeNotification).toBe('function');
        expect(typeof result.current.clearNotifications).toBe('function');
    });

    it('should add a notification', () => {
        const { result } = renderHook(() => useNotification());

        act(() => {
            result.current.addNotification('success', 'Test success message');
        });

        expect(result.current.notifications).toHaveLength(1);
        expect(result.current.notifications[0]).toMatchObject({
            type: 'success',
            message: 'Test success message',
            duration: 5000
        });
        expect(result.current.notifications[0].id).toBeDefined();
    });

    it('should add multiple notifications', () => {
        const { result } = renderHook(() => useNotification());

        act(() => {
            result.current.addNotification('success', 'First message');
            result.current.addNotification('error', 'Second message');
        });

        expect(result.current.notifications).toHaveLength(2);
        expect(result.current.notifications[0].message).toBe('First message');
        expect(result.current.notifications[1].message).toBe('Second message');
    });

    it('should remove a notification by id', () => {
        const { result } = renderHook(() => useNotification());

        act(() => {
            result.current.addNotification('info', 'Test message');
        });

        const notificationId = result.current.notifications[0].id;

        act(() => {
            result.current.removeNotification(notificationId);
        });

        expect(result.current.notifications).toHaveLength(0);
    });

    it('should clear all notifications', () => {
        const { result } = renderHook(() => useNotification());

        act(() => {
            result.current.addNotification('success', 'First');
            result.current.addNotification('error', 'Second');
        });

        expect(result.current.notifications).toHaveLength(2);

        act(() => {
            result.current.clearNotifications();
        });

        expect(result.current.notifications).toHaveLength(0);
    });

    it('should auto-remove notification after duration', () => {
        const { result } = renderHook(() => useNotification());

        act(() => {
            result.current.addNotification('warning', 'Auto remove', 1000);
        });

        expect(result.current.notifications).toHaveLength(1);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(result.current.notifications).toHaveLength(0);
    });
}); 