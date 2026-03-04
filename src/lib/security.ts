/**
 * Security Utilities
 * - CSP Nonce generation
 * - Rate limiting with file backup
 */

import { randomBytes } from 'crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
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
// RATE LIMITING WITH FILE BACKUP
// ============================================

interface RateLimitEntry {
    count: number;
    windowStart: number;
}

// In-memory rate limit storage
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration from environment variables (with defaults: 5 requests per 10 minutes)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '600000', 10);
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
const BACKUP_FILE = join(process.cwd(), 'data', 'rate-limit-backup.json');

// Load from backup on startup
try {
    if (existsSync(BACKUP_FILE)) {
        const data = JSON.parse(readFileSync(BACKUP_FILE, 'utf-8'));
        const now = Date.now();

        for (const [key, value] of Object.entries(data)) {
            const entry = value as RateLimitEntry;
            if (now - entry.windowStart < RATE_LIMIT_WINDOW * 2) {
                rateLimitStore.set(key, entry);
            }
        }
    }
} catch (error) {
    console.error("Failed to load rate limit backup:", error instanceof Error ? error.message : error);
}

// Backup to file every minute
setInterval(() => {
    try {
        const data: Record<string, RateLimitEntry> = {};
        const now = Date.now();

        for (const [key, value] of rateLimitStore.entries()) {
            if (now - value.windowStart < RATE_LIMIT_WINDOW * 2) {
                data[key] = value;
            }
        }
        mkdirSync(join(process.cwd(), 'data'), { recursive: true });
        writeFileSync(BACKUP_FILE, JSON.stringify(data), 'utf-8');
    } catch (error) {
        console.error("Failed to save rate limit backup:", error instanceof Error ? error.message : error);
    }
}, 60 * 1000);

/**
 * Check if an IP is rate limited
 * Returns: { allowed: boolean, remaining: number, resetIn: number }
 */
export function checkRateLimit(ip: string, action: string = "default"): {
    allowed: boolean;
    remaining: number;
    resetIn: number;
} {
    const key = `${ip}:${action}`;
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || (now - entry.windowStart >= RATE_LIMIT_WINDOW)) {
        rateLimitStore.set(key, { count: 1, windowStart: now });
        return {
            allowed: true,
            remaining: MAX_REQUESTS_PER_WINDOW - 1,
            resetIn: RATE_LIMIT_WINDOW
        };
    }

    const remaining = MAX_REQUESTS_PER_WINDOW - entry.count - 1;
    const resetIn = RATE_LIMIT_WINDOW - (now - entry.windowStart);

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
        return { allowed: false, remaining: 0, resetIn };
    }

    // Fix #6: Gunakan spread untuk immutable update
    rateLimitStore.set(key, { ...entry, count: entry.count + 1 });

    return {
        allowed: true,
        remaining: Math.max(0, remaining),
        resetIn
    };
}

/**
 * Reset rate limit for an IP (useful for testing)
 */
export function resetRateLimit(ip: string, action: string = "default"): void {
    rateLimitStore.delete(`${ip}:${action}`);
}
