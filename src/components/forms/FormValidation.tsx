// Form validation utilities and hooks
import { useState } from "react";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule;
}

export interface ValidationErrors {
  [fieldName: string]: string;
}

export const useFormValidation = (validationRules: FieldValidation) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (fieldName: string, value: any): string | null => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    if (rules.required && (!value || value.toString().trim() === '')) {
      return `${fieldName} is required`;
    }

    if (rules.minLength && value && value.toString().length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value && value.toString().length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`;
    }

    if (rules.pattern && value && !rules.pattern.test(value.toString())) {
      return `${fieldName} format is invalid`;
    }

    if (rules.custom && value) {
      return rules.custom(value);
    }

    return null;
  };

  const validateForm = (formData: any): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const validateSingleField = (fieldName: string, value: any): boolean => {
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
    return !error;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validateForm,
    validateSingleField,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0
  };
};

// Common validation rules
export const commonValidations = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    pattern: /^[\+]?[\d\s\-\(\)]{10,}$/
  },
  required: {
    required: true
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return "Password must contain at least one lowercase letter, one uppercase letter, and one number";
      }
      return null;
    }
  }
};