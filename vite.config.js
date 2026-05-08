import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177,
    host: true,
    allowedHosts: [
      'document-carwash-oxidant.ngrok-free.dev',
      'localhost',
      '.ngrok-free.dev',
      '.ngrok.io',
    ],
    proxy: {
      '/consultation': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})