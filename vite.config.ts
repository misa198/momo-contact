import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest: {
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'Momo Contact',
        name: 'Momo Contact',
      },
    }),
  ],
});
