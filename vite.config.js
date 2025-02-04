import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.ditq.org',
        changeOrigin: true,
        secure: false
      },
      '/storage': {
        target: 'https://api.ditq.org',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
