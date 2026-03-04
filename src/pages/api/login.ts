import type { APIRoute } from "astro";
import { checkRateLimit } from "../../lib/security";

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
    try {
        const ip = clientAddress || "unknown-ip";

        // === Rate Limiting: Max 5 percobaan per 15 menit ===
        const rateLimit = checkRateLimit(ip, "login");
        if (!rateLimit.allowed) {
            const waitSeconds = Math.ceil(rateLimit.resetIn / 1000);
            return new Response(JSON.stringify({ error: `Terlalu banyak percobaan. Coba lagi dalam ${waitSeconds} detik.` }), {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": String(waitSeconds),
                },
            });
        }

        const body = await request.json();
        const expectedToken = import.meta.env.ADMIN_TOKEN;

        if (!expectedToken || body.password !== expectedToken) {
            return new Response(JSON.stringify({ error: "Password salah." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Set HttpOnly, Secure cookie
        cookies.set("admin_session", expectedToken, {
            path: "/",
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
