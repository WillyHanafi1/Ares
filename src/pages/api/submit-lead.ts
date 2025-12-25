
import type { APIRoute } from "astro";

// Simple in-memory rate limit storage
// Key: IP address, Value: Timestamp of last request
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

import "dotenv/config";

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        // === 1. IP-Based Rate Limiting ===
        const ip = clientAddress || "unknown-ip";
        const now = Date.now();
        const lastRequestTime = rateLimitMap.get(ip) || 0;

        if (now - lastRequestTime < (RATE_LIMIT_WINDOW / MAX_REQUESTS_PER_WINDOW)) {
            // Simple 'cooldown' style: if too fast, reject.
            // For more complex 'bucket' logic, we'd store an array of timestamps.
            // Here, strictly enforcing spacing between requests is often enough for spam.
            // OR, simplified:
        }

        // Better Rate Limiting: Minimum 10 seconds between requests from same IP
        if (now - lastRequestTime < 10000) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Too many requests. Please wait.",
                }),
                { status: 429 },
            );
        }
        rateLimitMap.set(ip, now);


        const data = await request.json();
        const {
            token,
            name,
            business,
            whatsapp,
            country,
            challenge,
            challenge_label,
            source,
            submitted_at,
        } = data;

        // === 2. Server-Side Input Validation ===

        // Validate Token presence
        if (!token) {
            return new Response(JSON.stringify({ success: false, message: "Missing reCAPTCHA token." }), { status: 400 });
        }

        // Validate Name (Max 100 chars, required)
        if (!name || typeof name !== "string" || name.length > 100 || name.length < 2) {
            return new Response(JSON.stringify({ success: false, message: "Invalid name format." }), { status: 400 });
        }

        // Validate Business (Max 150 chars, optional but must be string if present)
        if (business && (typeof business !== "string" || business.length > 150)) {
            return new Response(JSON.stringify({ success: false, message: "Invalid business name format." }), { status: 400 });
        }

        // Validate WhatsApp (Numeric, 8-20 chars to be safe)
        const phoneRegex = /^\+?[0-9]{8,20}$/;
        if (!whatsapp || !phoneRegex.test(whatsapp)) {
            return new Response(JSON.stringify({ success: false, message: "Invalid phone number format." }), { status: 400 });
        }

        // === 3. Verify with Google reCAPTCHA ===
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
            remoteip: ip, // Send user IP to Google for better verification
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
                    message: "Spam detected. Score too low.",
                }),
                { status: 400 },
            );
        }

        // === 4. Forward to n8n Webhook ===
        // Try to get from Astro env, fallback to process.env (Node runtime)
        const webhookUrl = import.meta.env.PUBLIC_WEBHOOK_URL || process.env.PUBLIC_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error("DEBUG: ENV VARS:", process.env); // Log environment variables for debugging
            throw new Error("PUBLIC_WEBHOOK_URL is not defined. Check .env file.");
        }

        const n8nPayload = {
            name: name.substring(0, 100), // Enforce truncation just in case
            business: business ? business.substring(0, 150) : "",
            whatsapp,
            country: country || "",
            challenge: challenge || "",
            challenge_label: challenge_label || "",
            source: "website",
            submitted_at,
            recaptcha_score: score,
            ip_address: ip, // Log IP (optional, good for forensics)
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
            JSON.stringify({ success: true, message: "Lead processed" }),
            { status: 200 },
        );
    } catch (error) {
        console.error("API Error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error" }),
            { status: 500 },
        );
    }
};
