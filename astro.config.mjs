import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  site: 'https://seriaflow.com',
  integrations: [react(), sitemap({
    filter: (page) => !page.includes('/resources'),
  })],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
  server: {
    host: true,
    port: 4321,
  },
});
