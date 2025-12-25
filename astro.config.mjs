import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://seriaflow.com',
    integrations: [tailwind()],
    vite: {
        server: {
            allowedHosts: ['seriaflow.com', 'www.seriaflow.com', 'localhost'],
        },
        preview: {
            allowedHosts: ['seriaflow.com', 'www.seriaflow.com', 'localhost'],
        },
    },
});
