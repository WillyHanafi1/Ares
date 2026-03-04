import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
    // Flag harus sama dengan saat Astro.cookies.set() di resources.astro & login.ts
    cookies.delete("admin_session", {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "strict",
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
        },
    });
};
