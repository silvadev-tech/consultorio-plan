import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
})
// vite ja refatorado e com as modificações