import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    compression({
      algorithm: 'brotliCompress',
      ext: '.gz',
      threshold: 5120,
    }),
    react()
  ],
});
