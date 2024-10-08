import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 5120,
      compressionOptions: { level: 11 },
      filter: /\.(js|css|html|svg|json)$/,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 5120,
      compressionOptions: { level: 9 },
      filter: /\.(js|css|html|svg|json)$/,
    }),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'Vite + react + ts',
    //     short_name: 'Vite + react + ts',
    //     start_url: '/',
    //     display: 'standalone',
    //     background_color: '#ffffff',
    //     theme_color: '#000000',
    //   },
    // }),
    react()
  ],
});
