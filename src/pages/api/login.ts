import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
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
