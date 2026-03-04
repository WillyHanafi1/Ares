import { defineMiddleware } from "astro:middleware";
import { generateNonce } from "./lib/security";

// Security Headers Middleware
// Injects security headers into every response to protect against common attacks.
// Uses nonce-based CSP for enhanced security.
export const onRequest = defineMiddleware(async (context, next) => {
    // Generate a unique nonce for this request
    const nonce = generateNonce();

    // Store nonce in locals for use in templates
    context.locals.nonce = nonce;

    const response = await next();

    // Clone headers to add security headers
    const newHeaders = new Headers(response.headers);

    // HSTS: Enforce HTTPS for 1 year
    newHeaders.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload"
    );

    // X-Content-Type-Options: Prevent MIME type sniffing
    newHeaders.set("X-Content-Type-Options", "nosniff");

    // X-Frame-Options: Prevent Clickjacking
    newHeaders.set("X-Frame-Options", "SAMEORIGIN");

    // Referrer-Policy: Control referrer information
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // X-XSS-Protection: Enable XSS filter in older browsers
    newHeaders.set("X-XSS-Protection", "1; mode=block");

    // Permissions-Policy: Restrict browser features
    newHeaders.set(
        "Permissions-Policy",
        "geolocation=(), microphone=(), camera=(), payment=()"
    );

    // Content-Security-Policy: Protect against XSS and other injection attacks
    newHeaders.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            `script-src 'self' 'nonce-${nonce}' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com`,
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com",
            "frame-src 'self' https://www.google.com",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
        ].join("; ")
    );

    // For HTML responses, inject nonce into script tags
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
        const html = await response.text();

        const modifiedHtml = html
            .replace(/<script(?![^>]*\bsrc=)(?![^>]*\bnonce=)/gi, `<script nonce="${nonce}"`)
            .replace(/\{nonce\}/g, nonce);

        return new Response(modifiedHtml, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
});
