/**
 * Resource Lead Submission API
 * Handles form submissions with:
 * - Persistent rate limiting (file-backed)
 * - reCAPTCHA verification
 * - Input validation
 */

import type { APIRoute } from "astro";
import { checkRateLimit } from "../../lib/security";
import "dotenv/config";
import { z } from "zod";

// Basic HTML sanitization
const sanitizeHtml = (str: string) => str.replace(/[<>]/g, "");

const resourceSchema = z.object({
    token: z.string().min(1, "Missing reCAPTCHA token."),
    name: z.string().min(1, "Nama wajib diisi").transform(sanitizeHtml),
    email: z.string().email("Format email tidak valid").transform(sanitizeHtml),
    whatsapp: z.string().min(10, "Nomor WhatsApp minimal 10 digit").optional().or(z.literal("")),
    type: z.enum(["company", "freelancer", "student", "other"]),
    timestamp: z.string().optional(),
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        const ip = clientAddress || "unknown-ip";

        // === 1. Rate Limiting ===
        const rateLimit = checkRateLimit(ip, "submit-resource");

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
                        "Content-Type": "application/json",
                        "Retry-After": String(waitSeconds),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000)),
                    }
                },
            );
        }

        const rawData = await request.json();

        // === 2. Server-Side Input Validation ===
        const parsed = resourceSchema.safeParse(rawData);

        if (!parsed.success) {
            return new Response(
                JSON.stringify({ success: false, message: parsed.error.issues[0].message }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const {
            token,
            name,
            email,
            whatsapp,
            type,
            timestamp,
        } = parsed.data;

        // === 3. Verify with Google reCAPTCHA ===
        const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.error("RECAPTCHA_SECRET_KEY is missing");
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Server configuration error",
                }),
                { status: 500, headers: { "Content-Type": "application/json" } },
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

        console.log("reCAPTCHA Verification (Resources):", {
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
                { status: 400, headers: { "Content-Type": "application/json" } },
            );
        }

        // === 4. Forward to n8n Webhook ===
        const webhookUrl = import.meta.env.PUBLIC_RESOURCES_WEBHOOK_URL || process.env.PUBLIC_RESOURCES_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error("PUBLIC_RESOURCES_WEBHOOK_URL is not defined. Check .env file.");
            throw new Error("Webhook URL configuration error.");
        }

        const n8nPayload = {
            name: name,
            email: email,
            whatsapp: whatsapp,
            type: type,
            source: "resources-page",
            timestamp: timestamp || new Date().toISOString(),
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
                message: "Resource lead processed",
                rate_limit_remaining: rateLimit.remaining,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "X-RateLimit-Remaining": String(rateLimit.remaining),
                }
            },
        );
    } catch (error) {
        console.error("API Error (Resources):", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
};
