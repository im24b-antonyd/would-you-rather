import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // This moves the finished game into Spring's static folder
    outDir: '../src/main/resources/static',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // Any request to /api is sent to your Spring Boot server
      '/api': 'http://localhost:8080'
    }
  }
})