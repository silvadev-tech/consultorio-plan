import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    },
    proxy: {
      '/dentistas': {
        target: 'http://localhost:8080', // porta do Spring Boot
        changeOrigin: true,
        secure: false
      }
    }
  }
})
