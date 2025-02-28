/**
 * Utilities for working with browser storage (localStorage/sessionStorage)
 */

const PREFIX = 'admin_dashboard_';

/**
 * Save data to localStorage
 */
export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${PREFIX}${key}`, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedValue = localStorage.getItem(`${PREFIX}${key}`);
    if (serializedValue === null) return defaultValue;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all app-related items from localStorage
 */
export const clearAppStorage = (): void => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing app storage:', error);
  }
};

/**
 * Save data to sessionStorage (cleared when browser is closed)
 */
export const saveToSessionStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(`${PREFIX}${key}`, serializedValue);
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
};

/**
 * Get data from sessionStorage
 */
export const getFromSessionStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedValue = sessionStorage.getItem(`${PREFIX}${key}`);
    if (serializedValue === null) return defaultValue;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('Error getting from sessionStorage:', error);
    return defaultValue;
  }
};