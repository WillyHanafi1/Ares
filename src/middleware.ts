import { defineMiddleware } from "astro:middleware";

// Security Headers Middleware
// Injects security headers into every response to protect against common attacks.
export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();

    // Clone headers to add security headers
    const newHeaders = new Headers(response.headers);

    // HSTS: Enforce HTTPS for 1 year
    newHeaders.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );

    // X-Content-Type-Options: Prevent MIME type sniffing
    newHeaders.set("X-Content-Type-Options", "nosniff");

    // X-Frame-Options: Prevent Clickjacking (allow same origin for iframes if needed)
    newHeaders.set("X-Frame-Options", "SAMEORIGIN");

    // Referrer-Policy: Control referrer information
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Content-Security-Policy: Protect against XSS and other injection attacks
    newHeaders.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://www.google.com https://www.gstatic.com",
            "frame-src 'self' https://www.google.com",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
        ].join("; ")
    );

    // Return a new response with the same body but updated headers
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
});
