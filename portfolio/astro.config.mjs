// @ts-check
import {defineConfig} from 'astro/config';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],
  vite: {
    server: {
      watch: {
        // Explicitly ignore node_modules and heavy icon packages
        ignored: [
          '**/node_modules/**',
          '**/node_modules/@iconify-json/**',
          '**/.git/**',
        ],
      },
    },
  },
});
