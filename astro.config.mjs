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
});