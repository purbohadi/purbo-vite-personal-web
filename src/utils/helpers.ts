/**
 * General helper functions
 */

/**
 * Generate a random ID
 */
export const generateId = (prefix: string = 'id'): string => {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
  };
    
  /**
   * Debounce a function
   */
  export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    
    return function(this: any, ...args: Parameters<T>): void {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  /**
   * Deep clone an object
   */
  export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  };
  
  /**
   * Group an array of objects by a key
   */
  export const groupBy = <T>(array: T[], key: keyof T): { [key: string]: T[] } => {
    return array.reduce((result, item) => {
      const groupKey = String(item[key]);
      result[groupKey] = result[groupKey] || [];
      result[groupKey].push(item);
      return result;
    }, {} as { [key: string]: T[] });
  };
  
  /**
   * Sort an array of objects by a key
   */
  export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  /**
   * Split an array into chunks of a specified size
   */
  export const chunkArray = <T>(array: T[], size: number): T[][] => {
    return array.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(array.slice(i, i + size));
      }
      return acc;
    }, [] as T[][]);
  };
  
  /**
   * Convert a RGB color to hex
   */
  export const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  /**
   * Convert a hex color to RGB
   */
  export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };
