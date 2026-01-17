
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Vite does not polyfill process.env by default. This ensures the app doesn't crash.
    'process.env': {}
  },
  build: {
    // Optimization to handle large libraries and fix the Vercel build warning
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'viz-libs': ['recharts', 'leaflet'],
          'genai': ['@google/genai'],
        },
      },
    },
  },
});
