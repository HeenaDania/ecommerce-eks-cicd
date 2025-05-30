import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // needed for Docker Container port mapping
    port: 5173,         // Vite default port
    strictPort: true,
    watch: {
      usePolling: true, // needed for hot reload in Docker
    },
  },
});
