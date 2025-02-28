// src/hooks/useForm.ts
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: string) => boolean | string;
}

interface FieldConfig {
  initialValue: string;
  validations?: ValidationRules;
}

type FormConfig = Record<string, FieldConfig>;
type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type FormTouched = Record<string, boolean>;

interface FormResult {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (onSubmit: (values: FormValues) => Promise<void>) => (e: FormEvent) => void;
  reset: () => void;
  isValid: boolean;
}

/**
 * Hook for form state management and validation
 */
export function useForm(config: FormConfig): FormResult {
  // Initialize state
  const initialValues = Object.entries(config).reduce((acc, [key, { initialValue }]) => {
    acc[key] = initialValue;
    return acc;
  }, {} as FormValues);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = (name: string, value: string): string => {
    const fieldConfig = config[name];
    if (!fieldConfig || !fieldConfig.validations) return '';

    const { validations } = fieldConfig;
    
    if (validations.required && !value) {
      return 'This field is required';
    }

    if (validations.minLength && value.length < validations.minLength) {
      return `Minimum length is ${validations.minLength}`;
    }

    if (validations.maxLength && value.length > validations.maxLength) {
      return `Maximum length is ${validations.maxLength}`;
    }

    if (validations.pattern && !validations.pattern.test(value)) {
      return 'Invalid format';
    }

    if (validations.validate) {
      const result = validations.validate(value);
      if (typeof result === 'string') {
        return result;
      }
      if (result === false) {
        return 'Invalid value';
      }
    }

    return '';
  };

  // Validate all fields and return all errors
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    
    Object.keys(config).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    return newErrors;
  }, [values, config]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // If the field has been touched, validate it on change
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle input blur
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = (onSubmit: (values: FormValues) => Promise<void>) => {
    return async (e: FormEvent) => {
      e.preventDefault();
      
      // Validate all fields
      const formErrors = validateForm();
      setErrors(formErrors);
      
      // Mark all fields as touched
      const allTouched = Object.keys(config).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as FormTouched);
      setTouched(allTouched);
      
      // If there are no errors, submit
      if (Object.keys(formErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  };

  // Reset form to initial state
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isValid,
  };
}