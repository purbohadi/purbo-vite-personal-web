/**
 * Utility functions for form validation
 */

/**
 * Validate an email address
 */
export const isValidEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Validate that a string is not empty
   */
  export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
  };
  
  /**
   * Validate password strength
   * - At least 8 characters
   * - Contains at least one uppercase letter
   * - Contains at least one lowercase letter
   * - Contains at least one number
   */
  export const isStrongPassword = (password: string): boolean => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };
  
  /**
   * Get password strength as a score from 0-4
   * 0: No password
   * 1: Very weak (less than 6 chars)
   * 2: Weak (6+ chars, but missing uppercase/lowercase/numbers)
   * 3: Moderate (8+ chars with at least lowercase, uppercase, and numbers)
   * 4: Strong (8+ chars with lowercase, uppercase, numbers, and special chars)
   */
  export const getPasswordStrength = (password: string): number => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    
    // Character type checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    return Math.min(4, Math.floor(score / 2) + 1);
  };
  
  /**
   * Validate a credit card number using Luhn algorithm
   */
  export const isValidCreditCard = (cardNumber: string): boolean => {
    // Remove spaces and non-digits
    const value = cardNumber.replace(/\D/g, '');
    
    if (!value) return false;
    
    // Check length (13-19 digits for most major cards)
    if (value.length < 13 || value.length > 19) return false;
    
    // Luhn algorithm
    let sum = 0;
    let shouldDouble = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
  };
  
  /**
   * Validate a phone number
   */
  export const isValidPhoneNumber = (phone: string): boolean => {
    // Basic validation (numbers, spaces, dashes, parentheses, plus sign)
    const cleaned = phone.replace(/\s+/g, '');
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(cleaned);
  };

  