// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

/**
 * Hook that returns true if the provided media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null on server-side (pre-render)
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);
      
      // Set initial value
      setMatches(mediaQuery.matches);
      
      // Create event listener for changes
      const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
      
      // Add event listener
      mediaQuery.addEventListener('change', handler);
      
      // Remove event listener on cleanup
      return () => mediaQuery.removeEventListener('change', handler);
    }
    
    return undefined; // Return empty cleanup function for SSR
  }, [query]);

  return matches;
}

// Common media query breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');