/**
 * Types and utilities for form validation
 * Used across all forms in the application
 */

// Base validation rule interface
export interface ValidationRule<T = unknown> {
  readonly validate: (value: T) => boolean;
  readonly message: string;
}

// Field validation configuration
export interface FieldValidation<T = unknown> {
  readonly required?: boolean;
  readonly rules?: ReadonlyArray<ValidationRule<T>>;
}

// Form validation configuration
export type FormValidation<T> = {
  readonly [K in keyof T]?: FieldValidation<T[K]>;
};

// Validation result
export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: Record<string, string>;
}

// Common validation rules factory
export const validationRules = {
  positiveNumber: (message = 'Must be a positive number'): ValidationRule<number> => ({
    validate: (value: number): boolean => value > 0,
    message,
  }),

  nonEmptyString: (message = 'This field is required'): ValidationRule<string> => ({
    validate: (value: string): boolean => value.trim().length > 0,
    message,
  }),

  validEmail: (message = 'Please enter a valid email'): ValidationRule<string> => ({
    validate: (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value: string): boolean => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value: string): boolean => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  inRange: (min: number, max: number, message?: string): ValidationRule<number> => ({
    validate: (value: number): boolean => value >= min && value <= max,
    message: message || `Must be between ${min} and ${max}`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value: string): boolean => regex.test(value),
    message,
  }),
} as const;

// Validation helper function
export const validateForm = <T extends Record<string, unknown>>(
  values: T,
  validation: FormValidation<T>,
): ValidationResult => {
  const errors: Record<string, string> = {};
  let valid = true;

  Object.entries(validation).forEach(([field, fieldValidation]) => {
    if (!fieldValidation) {
      return;
    }

    const value = values[field];
    const { required, rules } = fieldValidation;

    // Check required
    if (required && (value === undefined || value === null || value === '')) {
      errors[field] = 'This field is required';
      valid = false;
      return;
    }

    // Skip validation if not required and empty
    if (!required && (value === undefined || value === null || value === '')) {
      return;
    }

    // Check rules
    if (rules) {
      for (const rule of rules) {
        if (!rule.validate(value as never)) {
          errors[field] = rule.message;
          valid = false;
          break;
        }
      }
    }
  });

  return { valid, errors };
};

// Specific validation schemas
export const exerciseValidation: FormValidation<{
  name: string;
  muscle_groups: string[];
  default_sets: number;
  default_reps?: number | null;
  default_rest_seconds: number;
}> = {
  name: {
    required: true,
    rules: [validationRules.minLength(3), validationRules.maxLength(100)],
  },
  muscle_groups: {
    required: true,
    rules: [
      {
        validate: (value: string[]): boolean => value.length > 0,
        message: 'Select at least one muscle group',
      },
    ],
  },
  default_sets: {
    required: true,
    rules: [validationRules.positiveNumber(), validationRules.inRange(1, 10)],
  },
  default_reps: {
    rules: [
      {
        validate: (value: number | null | undefined): boolean =>
          value === null || value === undefined || (value >= 1 && value <= 100),
        message: 'Reps must be between 1 and 100',
      },
    ],
  },
  default_rest_seconds: {
    required: true,
    rules: [validationRules.inRange(0, 600, 'Rest must be between 0 and 10 minutes')],
  },
};

export const workoutValidation: FormValidation<{
  name: string;
  description?: string;
  category: string;
  difficulty: string;
}> = {
  name: {
    required: true,
    rules: [validationRules.minLength(3), validationRules.maxLength(100)],
  },
  description: {
    rules: [
      {
        validate: (value: string | undefined): boolean =>
          value === undefined || value.length <= 500,
        message: 'Must be no more than 500 characters',
      },
    ],
  },
  category: {
    required: true,
  },
  difficulty: {
    required: true,
  },
};
