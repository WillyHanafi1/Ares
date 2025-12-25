/**
 * CSRF Token API Endpoint
 * Returns a new CSRF token for form submissions
 */

import type { APIRoute } from "astro";
import { generateCSRFToken } from "../../lib/security";

export const GET: APIRoute = async ({ clientAddress }) => {
    const ip = clientAddress || "unknown";
    const token = generateCSRFToken(ip);

    return new Response(
        JSON.stringify({
            success: true,
            token
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
            }
        }
    );
};
