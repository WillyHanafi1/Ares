import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

const RESOURCES_DIR = path.join(process.cwd(), "public/resources");

export const DELETE: APIRoute = async ({ params, request }) => {
    const filename = params.filename;
    const url = new URL(request.url);
    const token = url.searchParams.get("admin");
    const expectedToken = import.meta.env.ADMIN_TOKEN;

    if (!expectedToken || token !== expectedToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    if (!filename || !filename.endsWith(".pdf")) {
        return new Response(JSON.stringify({ error: "Nama file tidak valid" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const filePath = path.join(RESOURCES_DIR, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ error: "File tidak ditemukan" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Gagal menghapus file dari storage lokal." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
