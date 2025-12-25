/**
 * Lead Submission API
 * Handles form submissions with:
 * - Persistent rate limiting (file-backed)
 * - CSRF token validation
 * - reCAPTCHA verification
 * - Input validation
 */

import type { APIRoute } from "astro";
import { checkRateLimit, verifyCSRFToken } from "../../lib/security";
import "dotenv/config";

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        const ip = clientAddress || "unknown-ip";

        // === 1. Rate Limiting (Persistent with file backup) ===
        const rateLimit = checkRateLimit(ip);

        if (!rateLimit.allowed) {
            const waitSeconds = Math.ceil(rateLimit.resetIn / 1000);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: `Too many requests. Please wait ${waitSeconds} seconds.`,
                    retry_after: waitSeconds,
                }),
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(waitSeconds),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000)),
                    }
                },
            );
        }

        const data = await request.json();
        const {
            token,
            csrf_token,
            name,
            business,
            whatsapp,
            country,
            challenge,
            challenge_label,
            submitted_at,
        } = data;

        // === 2. CSRF Token Validation ===
        const csrfFromHeader = request.headers.get("X-CSRF-Token");
        const csrfTokenToVerify = csrfFromHeader || csrf_token;

        if (!csrfTokenToVerify || !verifyCSRFToken(csrfTokenToVerify)) {
            console.warn("CSRF validation failed:", {
                ip,
                hasHeader: !!csrfFromHeader,
                hasBody: !!csrf_token
            });
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Invalid security token. Please refresh the page and try again."
                }),
                { status: 403 }
            );
        }

        // === 3. Server-Side Input Validation ===

        // Validate reCAPTCHA Token presence
        if (!token) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing reCAPTCHA token." }),
                { status: 400 }
            );
        }

        // Validate Name (Max 100 chars, required, min 2 chars)
        if (!name || typeof name !== "string" || name.length > 100 || name.length < 2) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid name format." }),
                { status: 400 }
            );
        }

        // Validate Business (Max 150 chars, optional but must be string if present)
        if (business && (typeof business !== "string" || business.length > 150)) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid business name format." }),
                { status: 400 }
            );
        }

        // Validate WhatsApp (Numeric, 8-20 chars to be safe)
        const phoneRegex = /^\+?[0-9]{8,20}$/;
        if (!whatsapp || !phoneRegex.test(whatsapp)) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid phone number format." }),
                { status: 400 }
            );
        }

        // === 4. Verify with Google reCAPTCHA ===
        const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.error("RECAPTCHA_SECRET_KEY is missing");
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Server configuration error",
                }),
                { status: 500 },
            );
        }

        const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
        const googleParams = new URLSearchParams({
            secret: secretKey,
            response: token,
            remoteip: ip,
        });

        const googleResponse = await fetch(verifyUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: googleParams,
        });

        const googleData = await googleResponse.json();
        const score = googleData.score;

        console.log("reCAPTCHA Verification:", {
            success: googleData.success,
            score: score,
            action: googleData.action,
            ip: ip,
        });

        // Reject Low Scores (Spam)
        if (!googleData.success || score < 0.5) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Spam detected. Please try again.",
                }),
                { status: 400 },
            );
        }

        // === 5. Forward to n8n Webhook ===
        const webhookUrl = import.meta.env.PUBLIC_WEBHOOK_URL || process.env.PUBLIC_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error("PUBLIC_WEBHOOK_URL is not defined. Check .env file.");
            throw new Error("Webhook URL configuration error.");
        }

        const n8nPayload = {
            name: name.substring(0, 100),
            business: business ? business.substring(0, 150) : "",
            whatsapp,
            country: country || "",
            challenge: challenge || "",
            challenge_label: challenge_label || "",
            source: "website",
            submitted_at,
            recaptcha_score: score,
            ip_address: ip,
            user_agent: request.headers.get("user-agent") || "",
        };

        const n8nResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(n8nPayload),
        });

        if (!n8nResponse.ok) {
            throw new Error(`n8n webhook failed: ${n8nResponse.statusText}`);
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Lead processed",
                rate_limit_remaining: rateLimit.remaining,
            }),
            {
                status: 200,
                headers: {
                    "X-RateLimit-Remaining": String(rateLimit.remaining),
                }
            },
        );
    } catch (error) {
        console.error("API Error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error" }),
            { status: 500 },
        );
    }
};
