/**
 * Utility functions for formatting data
 */

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @param showSymbol Whether to include the currency symbol
 */
export const formatCurrency = (
    value: number, 
    currency: string = 'USD', 
    showSymbol: boolean = true
  ): string => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: showSymbol ? 'currency' : 'decimal',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    
    return formatter.format(value);
  };
  
  /**
   * Format a number with commas for thousands
   * @param value Number to format
   */
  export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };
  
  /**
   * Format a date string into a readable format
   * @param date Date string or timestamp
   * @param format Format type ('long', 'short', 'relative')
   */
  export const formatDate = (
    date: string | number | Date, 
    format: 'long' | 'short' | 'relative' = 'long'
  ): string => {
    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;
    
    if (format === 'relative') {
      return formatRelativeTime(dateObj);
    }
    
    const options: Intl.DateTimeFormatOptions = format === 'long' 
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };
    
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  };
  
  /**
   * Format a date as relative time (e.g., "3 days ago")
   * @param date Date to format
   */
  export const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSecs < 60) {
      return diffInSecs + ' second' + (diffInSecs !== 1 ? 's' : '') + ' ago';
    } else if (diffInMins < 60) {
      return diffInMins + ' minute' + (diffInMins !== 1 ? 's' : '') + ' ago';
    } else if (diffInHours < 24) {
      return diffInHours + ' hour' + (diffInHours !== 1 ? 's' : '') + ' ago';
    } else if (diffInDays < 30) {
      return diffInDays + ' day' + (diffInDays !== 1 ? 's' : '') + ' ago';
    } else {
      return formatDate(date, 'short');
    }
  };
  
  /**
   * Format a card number with masking
   * @param cardNumber Full card number
   * @param maskedSegments index of segments to mask (default: 1 and 2)
   */
  export const formatCardNumber = (cardNumber: string, maskedSegments: number = 3): string => {
    // Remove any spaces or non-numeric characters
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // Split into segments of 4
    const segments = cleanNumber.match(/.{1,4}/g) || [];
    
    // Mask the appropriate segments
    return segments.map((segment, index) => {
      return index === maskedSegments|| index === 1 ||  index === 2 ? '**** ' : segment + ' ';
    }).join('').trim();
  };
  
  /**
   * Format a percentage value
   * @param value Percentage as a decimal (0.25 = 25%)
   */
  export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

