import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: './build',
    minify: true,
    emptyOutDir: true,
  },
});
