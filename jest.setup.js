// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js environment variables for tests
process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-site-key';
process.env.RECAPTCHA_SECRET_KEY = 'test-secret-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.RESEND_API_KEY = 'test-resend-key';
process.env.NOTIFICATION_EMAIL = 'test@test.com';
process.env.RATE_LIMIT_MAX = '5';
process.env.RATE_LIMIT_WINDOW = '3600000';
