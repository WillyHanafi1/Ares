import { validateContactForm, ValidationResult } from '../validation';

describe('validateContactForm', () => {
    // Valid input tests
    describe('valid input', () => {
        it('should return valid result for correct input', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual({});
            expect(result.sanitizedData).toBeDefined();
            expect(result.sanitizedData?.name).toBe('John Doe');
            expect(result.sanitizedData?.email).toBe('john@example.com');
        });

        it('should trim whitespace from input', () => {
            const input = {
                name: '  John Doe  ',
                email: 'john@example.com', // email validator doesn't accept spaces
                company: '  Test Company  ',
                message: '  This is a test message that is long enough.  ',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(true);
            expect(result.sanitizedData?.name).toBe('John Doe');
            expect(result.sanitizedData?.company).toBe('Test Company');
        });

        it('should lowercase email', () => {
            const input = {
                name: 'John Doe',
                email: 'JOHN@EXAMPLE.COM',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.sanitizedData?.email).toBe('john@example.com');
        });
    });

    // Empty input tests
    describe('empty input', () => {
        it('should return error for null data', () => {
            const result = validateContactForm(null);

            expect(result.isValid).toBe(false);
            expect(result.errors.general).toBe('Invalid form data');
        });

        it('should return error for undefined data', () => {
            const result = validateContactForm(undefined);

            expect(result.isValid).toBe(false);
            expect(result.errors.general).toBe('Invalid form data');
        });

        it('should return error for empty name', () => {
            const input = {
                name: '',
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Name is required');
        });

        it('should return error for empty email', () => {
            const input = {
                name: 'John Doe',
                email: '',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.email).toBe('Email is required');
        });

        it('should return error for empty company', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: '',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.company).toBe('Company is required');
        });

        it('should return error for empty message', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company',
                message: '',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.message).toBe('Message is required');
        });
    });

    // Length validation tests
    describe('length validation', () => {
        it('should return error for name that is too short', () => {
            const input = {
                name: 'J',
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Name must be at least 2 characters');
        });

        it('should return error for message that is too short', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company',
                message: 'Short',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.message).toBe('Message must be at least 10 characters');
        });

        it('should return error for name that is too long', () => {
            const input = {
                name: 'J'.repeat(101),
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Name must not exceed 100 characters');
        });
    });

    // Email validation tests
    describe('email validation', () => {
        it('should return error for invalid email format', () => {
            const input = {
                name: 'John Doe',
                email: 'invalid-email',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.email).toBe('Invalid email format');
        });

        it('should return error for email without domain', () => {
            const input = {
                name: 'John Doe',
                email: 'john@',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.email).toBe('Invalid email format');
        });
    });

    // XSS detection tests
    describe('XSS detection', () => {
        it('should detect script tags in name', () => {
            const input = {
                name: '<script>alert("xss")</script>',
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Name contains invalid characters');
        });

        it('should detect javascript: protocol in message', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company',
                message: 'Click here: javascript:alert("xss")',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.message).toBe('Message contains invalid characters');
        });

        it('should detect onclick event handler in company', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company onclick=alert("xss")',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.company).toBe('Company contains invalid characters');
        });

        it('should detect iframe tags', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company',
                message: '<iframe src="evil.com"></iframe>',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.message).toBe('Message contains invalid characters');
        });
    });

    // SQL injection detection tests
    describe('SQL injection detection', () => {
        it('should detect SELECT statement in name', () => {
            const input = {
                name: "'; SELECT * FROM users; --",
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Name contains invalid characters');
        });

        it('should detect DROP statement in message', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Test Company',
                message: "'; DROP TABLE contacts; --",
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.message).toBe('Message contains invalid characters');
        });

        it('should detect UNION statement in company', () => {
            const input = {
                name: 'John Doe',
                email: 'john@example.com',
                company: "' UNION SELECT password FROM users",
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.company).toBe('Company contains invalid characters');
        });

        it('should detect OR 1=1 SQL injection', () => {
            const input = {
                name: "' OR 1=1 --",
                email: 'john@example.com',
                company: 'Test Company',
                message: 'This is a test message that is long enough.',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Name contains invalid characters');
        });
    });

    // Multiple errors test
    describe('multiple errors', () => {
        it('should return all errors when multiple fields are invalid', () => {
            const input = {
                name: '',
                email: 'invalid-email',
                company: 'X',
                message: 'Short',
            };

            const result = validateContactForm(input);

            expect(result.isValid).toBe(false);
            expect(Object.keys(result.errors).length).toBeGreaterThan(1);
        });
    });
});
