import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

const RESOURCES_DIR = path.join(process.cwd(), "public/resources");

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("admin");
    const expectedToken = import.meta.env.ADMIN_TOKEN;

    // Proteksi akses GET (hanya diperlihatkan di panel admin)
    if (!expectedToken || token !== expectedToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        if (!fs.existsSync(RESOURCES_DIR)) {
            return new Response(JSON.stringify({ files: [] }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        const files = fs.readdirSync(RESOURCES_DIR).filter((f) => f.endsWith(".pdf"));
        const fileData = files.map((filename) => {
            const stats = fs.statSync(path.join(RESOURCES_DIR, filename));
            return {
                filename,
                url: `/resources/${filename}`,
                sizeKB: Math.round(stats.size / 1024),
                uploadedAt: stats.mtime.toISOString(),
            };
        });

        return new Response(JSON.stringify({ files: fileData }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Gagal membaca direktori" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("admin");
    const expectedToken = import.meta.env.ADMIN_TOKEN;

    if (!expectedToken || token !== expectedToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const data = await request.formData();
        const file = data.get("file") as File;

        if (!file || !file.name.endsWith(".pdf")) {
            return new Response(JSON.stringify({ error: "Harus file PDF valid." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        if (!fs.existsSync(RESOURCES_DIR)) {
            fs.mkdirSync(RESOURCES_DIR, { recursive: true });
        }

        // Convert arrayBuffer to Buffer (Node.js)
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(RESOURCES_DIR, file.name);

        fs.writeFileSync(filePath, buffer);

        return new Response(JSON.stringify({ success: true, filename: file.name }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Upload gagal terjadi kesalahan server." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
