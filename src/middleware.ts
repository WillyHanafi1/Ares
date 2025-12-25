import { defineMiddleware } from "astro:middleware";
import { generateNonce } from "./lib/security";

// Security Headers Middleware
// Injects security headers into every response to protect against common attacks.
// Now with nonce-based CSP for enhanced security.
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

    // X-Frame-Options: Prevent Clickjacking (allow same origin for iframes if needed)
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
    // Using nonce-based approach instead of 'unsafe-inline'
    newHeaders.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            // Script sources: self + nonce for inline + trusted third parties
            `script-src 'self' 'nonce-${nonce}' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com`,
            // Style sources: still need unsafe-inline for dynamic styles and Google Fonts
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Font sources
            "font-src 'self' https://fonts.gstatic.com",
            // Image sources
            "img-src 'self' data: https: blob:",
            // Connect sources (API calls, fetch)
            "connect-src 'self' https://www.google.com https://www.gstatic.com",
            // Frame sources (reCAPTCHA)
            "frame-src 'self' https://www.google.com",
            // Disallow object/embed
            "object-src 'none'",
            // Base URI restriction
            "base-uri 'self'",
            // Form action restriction
            "form-action 'self'",
            // Upgrade insecure requests
            "upgrade-insecure-requests",
        ].join("; ")
    );

    // For HTML responses, inject nonce into the response
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
        const html = await response.text();

        // Inject nonce into script tags that need it
        // This handles any remaining inline scripts by adding nonce attribute
        const modifiedHtml = html
            // Add nonce to script tags that don't have src and don't already have nonce
            .replace(/<script(?![^>]*\bsrc=)(?![^>]*\bnonce=)/gi, `<script nonce="${nonce}"`)
            // Ensure external scripts loaded with nonce attribute work correctly
            .replace(/\{nonce\}/g, nonce);

        return new Response(modifiedHtml, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    }

    // Return a new response with the same body but updated headers
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
});
