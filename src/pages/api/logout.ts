import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
    // Samakan flag opsi keamanan dengan saat cookie diset di endpoint login
    cookies.delete("admin_session", {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "strict"
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
        },
    });
};
