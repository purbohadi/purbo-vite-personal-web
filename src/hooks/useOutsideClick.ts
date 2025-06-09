// src/hooks/useOutsideClick.ts
import { useEffect, RefObject } from 'react';

/**
 * Hook that handles outside clicks
 * @param ref Reference to the element to detect outside clicks
 * @param callback Function to call when a click outside is detected
 * @param dependencies Additional dependencies for the effect
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>, // Changed to accept null
  callback: () => void,
  dependencies: unknown[] = []
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, ...dependencies]);
}