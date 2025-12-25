import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://seriaflow.com',
    integrations: [tailwind()],
    vite: {
        server: {
            allowedHosts: true,
        },
        preview: {
            allowedHosts: true,
        },
    },
});
