import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

const RESOURCES_DIR = path.join(process.cwd(), "public/resources");

export const GET: APIRoute = async ({ request, cookies }) => {
    const adminSession = cookies.get("admin_session")?.value;
    const expectedToken = import.meta.env.ADMIN_TOKEN;

    // Proteksi akses GET (hanya diperlihatkan di panel admin)
    if (!expectedToken || adminSession !== expectedToken) {
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

export const POST: APIRoute = async ({ request, cookies }) => {
    const adminSession = cookies.get("admin_session")?.value;
    const expectedToken = import.meta.env.ADMIN_TOKEN;

    if (!expectedToken || adminSession !== expectedToken) {
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

        // Limit size to 20MB directly in backend to prevent memory exhaustion
        if (file.size > 20 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: "File terlalu besar. Maksimal 20MB." }), { status: 413 });
        }

        if (!fs.existsSync(RESOURCES_DIR)) {
            fs.mkdirSync(RESOURCES_DIR, { recursive: true });
        }

        // Convert arrayBuffer to Buffer (Node.js)
        const buffer = Buffer.from(await file.arrayBuffer());

        // --- Security checks ---
        // 1. Magic Bytes Validation (PDF signature: %PDF-)
        if (buffer.length < 5 || buffer.toString('utf8', 0, 5) !== "%PDF-") {
            return new Response(JSON.stringify({ error: "File signature invalid. Ini bukan file PDF asli." }), { status: 400 });
        }

        // 2. Path Traversal Prevention for New Uploads
        const safeFilename = path.basename(file.name);
        const filePath = path.join(RESOURCES_DIR, safeFilename);

        // Third check to ensure strict prefix constraint (Normalized for Windows vs POSIX)
        const resolvedResourcesDir = path.resolve(RESOURCES_DIR) + path.sep;
        const resolvedFilePath = path.resolve(filePath);

        if (!resolvedFilePath.startsWith(resolvedResourcesDir)) {
            return new Response(JSON.stringify({ error: "Akses Ditolak." }), { status: 403 });
        }

        // Fourth check to prevent accidental overwrites
        if (fs.existsSync(filePath)) {
            return new Response(JSON.stringify({ error: "File PDF dengan nama ini sudah ada." }), { status: 409 });
        }

        fs.writeFileSync(filePath, buffer);

        return new Response(JSON.stringify({ success: true, filename: safeFilename }), {
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
