/**
 * Security Utilities
 * - CSRF Token generation and validation
 * - CSP Nonce generation
 * - Rate limiting with file backup
 */

import { createHash, randomBytes } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// ============================================
// CSP NONCE
// ============================================

/**
 * Generate a cryptographically secure nonce for CSP
 */
export function generateNonce(): string {
    return randomBytes(16).toString('base64');
}

// ============================================
// CSRF TOKEN
// ============================================

// In-memory token store with expiration
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Clean expired tokens every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of csrfTokens.entries()) {
        if (value.expires < now) {
            csrfTokens.delete(key);
        }
    }
}, 5 * 60 * 1000);

/**
 * Generate a CSRF token tied to a session/IP
 * Token expires after 1 hour
 */
export function generateCSRFToken(identifier: string): string {
    const secret = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production';
    const timestamp = Date.now();
    const random = randomBytes(16).toString('hex');

    // Create token: hash of (secret + identifier + timestamp + random)
    const data = `${secret}:${identifier}:${timestamp}:${random}`;
    const token = createHash('sha256').update(data).digest('hex').substring(0, 32);

    // Store token with expiration (1 hour)
    csrfTokens.set(token, {
        token,
        expires: timestamp + (60 * 60 * 1000) // 1 hour
    });

    return token;
}

/**
 * Verify a CSRF token
 */
export function verifyCSRFToken(token: string): boolean {
    if (!token || token.length !== 32) {
        return false;
    }

    const stored = csrfTokens.get(token);
    if (!stored) {
        return false;
    }

    // Check expiration
    if (stored.expires < Date.now()) {
        csrfTokens.delete(token);
        return false;
    }

    // Token is valid - delete it (one-time use)
    csrfTokens.delete(token);
    return true;
}

// ============================================
// RATE LIMITING WITH FILE BACKUP
// ============================================

interface RateLimitEntry {
    count: number;
    windowStart: number;
}

// In-memory rate limit storage
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration from environment variables (with defaults: 5 requests per 10 minutes)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '600000', 10); // Default: 10 minutes
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.RATE_LIMIT_MAX || '5', 10); // Default: 5 requests
const BACKUP_FILE = join(process.cwd(), 'data', 'rate-limit-backup.json');

// Load from backup on startup
try {
    if (existsSync(BACKUP_FILE)) {
        const data = JSON.parse(readFileSync(BACKUP_FILE, 'utf-8'));
        const now = Date.now();

        // Only load entries that haven't expired
        for (const [key, value] of Object.entries(data)) {
            const entry = value as RateLimitEntry;
            if (now - entry.windowStart < RATE_LIMIT_WINDOW * 2) {
                rateLimitStore.set(key, entry);
            }
        }
    }
} catch {
    // Ignore errors, start fresh
}

// Backup to file every minute
setInterval(() => {
    try {
        const data: Record<string, RateLimitEntry> = {};
        const now = Date.now();

        for (const [key, value] of rateLimitStore.entries()) {
            // Only backup recent entries
            if (now - value.windowStart < RATE_LIMIT_WINDOW * 2) {
                data[key] = value;
            }
        }

        writeFileSync(BACKUP_FILE, JSON.stringify(data), 'utf-8');
    } catch {
        // Ignore backup errors
    }
}, 60 * 1000);

/**
 * Check if an IP is rate limited
 * Returns: { allowed: boolean, remaining: number, resetIn: number }
 */
export function checkRateLimit(ip: string): {
    allowed: boolean;
    remaining: number;
    resetIn: number;
} {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || (now - entry.windowStart >= RATE_LIMIT_WINDOW)) {
        // New window
        rateLimitStore.set(ip, { count: 1, windowStart: now });
        return {
            allowed: true,
            remaining: MAX_REQUESTS_PER_WINDOW - 1,
            resetIn: RATE_LIMIT_WINDOW
        };
    }

    // Within existing window
    const remaining = MAX_REQUESTS_PER_WINDOW - entry.count - 1;
    const resetIn = RATE_LIMIT_WINDOW - (now - entry.windowStart);

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
        return {
            allowed: false,
            remaining: 0,
            resetIn
        };
    }

    // Increment counter
    entry.count++;
    rateLimitStore.set(ip, entry);

    return {
        allowed: true,
        remaining: Math.max(0, remaining),
        resetIn
    };
}

/**
 * Reset rate limit for an IP (useful for testing)
 */
export function resetRateLimit(ip: string): void {
    rateLimitStore.delete(ip);
}
