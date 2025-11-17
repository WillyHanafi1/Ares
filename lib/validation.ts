import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: ContactFormData;
}

/**
 * Detects potential XSS attacks in input
 */
function detectXSS(input: string): boolean {
  const xssPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /eval\(/gi,
    /expression\(/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Detects potential SQL injection attempts
 */
function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b)/gi,
    /(--|\*|;|\/\*|\*\/)/g,
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi,
    /(\bUNION\b|\bJOIN\b)/gi,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Validates and sanitizes contact form data
 */
export function validateContactForm(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Check if data exists
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: { general: 'Invalid form data' },
    };
  }

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  } else if (detectXSS(data.name) || detectSQLInjection(data.name)) {
    errors.name = 'Name contains invalid characters';
  }

  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  } else if (data.email.length > 255) {
    errors.email = 'Email must not exceed 255 characters';
  } else if (detectXSS(data.email) || detectSQLInjection(data.email)) {
    errors.email = 'Email contains invalid characters';
  }

  // Validate company
  if (!data.company || typeof data.company !== 'string') {
    errors.company = 'Company is required';
  } else if (data.company.trim().length < 2) {
    errors.company = 'Company must be at least 2 characters';
  } else if (data.company.trim().length > 200) {
    errors.company = 'Company must not exceed 200 characters';
  } else if (detectXSS(data.company) || detectSQLInjection(data.company)) {
    errors.company = 'Company contains invalid characters';
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must not exceed 2000 characters';
  } else if (detectXSS(data.message) || detectSQLInjection(data.message)) {
    errors.message = 'Message contains invalid characters';
  }

  // If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  // Sanitize all inputs using DOMPurify
  const sanitizedData: ContactFormData = {
    name: DOMPurify.sanitize(data.name.trim(), { ALLOWED_TAGS: [] }),
    email: DOMPurify.sanitize(data.email.trim().toLowerCase(), { ALLOWED_TAGS: [] }),
    company: DOMPurify.sanitize(data.company.trim(), { ALLOWED_TAGS: [] }),
    message: DOMPurify.sanitize(data.message.trim(), { ALLOWED_TAGS: [] }),
  };

  return {
    isValid: true,
    errors: {},
    sanitizedData,
  };
}
