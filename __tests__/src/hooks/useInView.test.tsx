import { renderHook, act } from '@testing-library/react';
import useInView from '../../../src/hooks/useInView';

describe('useInView', () => {
  const mockIntersectionObserver = jest.fn();
  const mockDisconnect = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  let observerCallback: (entries: IntersectionObserverEntry[]) => void;

  const createMockEntry = (isIntersecting: boolean, target: Element): IntersectionObserverEntry => ({
    boundingClientRect: target.getBoundingClientRect(),
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: target.getBoundingClientRect(),
    isIntersecting,
    rootBounds: null,
    target,
    time: Date.now(),
  });

  beforeEach(() => {
    mockIntersectionObserver.mockReset();
    mockDisconnect.mockReset();
    mockObserve.mockReset();
    mockUnobserve.mockReset();

    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        disconnect: mockDisconnect,
        observe: mockObserve,
        unobserve: mockUnobserve,
      };
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should initialize with isInView as false', () => {
    const { result } = renderHook(() => useInView({}));
    const [, isInView] = result.current;
    expect(isInView).toBe(false);
  });

  it('should create an IntersectionObserver with the provided options', () => {
    const options = { threshold: 0.5 };
    renderHook(() => useInView(options));
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      options
    );
  });

  it('should observe the ref element when it exists', () => {
    const { result, rerender } = renderHook(() => useInView({}));
    const element = document.createElement('div');
    
    act(() => {
      (result.current[0] as any).current = element;
    });
    
    rerender();
    
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should set isInView to true when element intersects', () => {
    const { result, rerender } = renderHook(() => useInView({}));
    const element = document.createElement('div');
    
    act(() => {
      (result.current[0] as any).current = element;
    });
    
    rerender();
    
    act(() => {
      observerCallback([createMockEntry(true, element)]);
    });
    
    expect(result.current[1]).toBe(true);
    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });

  it('should unobserve when element is in view', () => {
    const { result, rerender } = renderHook(() => useInView({}));
    const element = document.createElement('div');
    
    act(() => {
      (result.current[0] as any).current = element;
    });
    
    rerender();
    
    act(() => {
      observerCallback([createMockEntry(true, element)]);
    });
    
    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });

  it('should cleanup observer on unmount', () => {
    const { result, rerender, unmount } = renderHook(() => useInView({}));
    const element = document.createElement('div');
    
    act(() => {
      (result.current[0] as any).current = element;
    });
    
    rerender();
    
    unmount();
    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });
}); 