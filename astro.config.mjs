import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
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

  adapter: node({
    mode: 'standalone',
  }),
  server: {
    host: true, // Listen on all addresses (0.0.0.0)
    port: 4321, // Custom port requested by user
  }
});