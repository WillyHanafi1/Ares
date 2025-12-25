import { defineMiddleware } from "astro:middleware";

// Security Headers Middleware
// Injects security headers into every response to protect against common attacks.
export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();

    const html = await response.text();

    // HSTS: Enforce HTTPS for 1 year
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );

    // X-Content-Type-Options: Prevent MIME type sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");

    // X-Frame-Options: Prevent Clickjacking (allow same origin for iframes if needed)
    response.headers.set("X-Frame-Options", "SAMEORIGIN");

    // Referrer-Policy: Control referrer information
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
});
