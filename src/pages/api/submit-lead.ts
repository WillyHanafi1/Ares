
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
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

        // 1. Verify with Google reCAPTCHA (Server-to-Server)
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
        });

        // 2. Reject Low Scores (Spam)
        if (!googleData.success || score < 0.5) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Spam detected. Score too low.",
                }),
                { status: 400 },
            );
        }

        // 3. Forward to n8n Webhook
        const webhookUrl =
            import.meta.env.PUBLIC_WEBHOOK_URL ||
            "https://n8n.seriaflow.com/webhook/Website-Leads-Seriaflow";

        const n8nPayload = {
            name,
            business,
            whatsapp,
            country,
            challenge,
            challenge_label,
            source,
            submitted_at,
            recaptcha_score: score, // Optional: send score for logging
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
