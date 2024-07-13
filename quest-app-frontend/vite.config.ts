import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/quest-app/',
  server: {
    port: 3000,
    proxy: {
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/posts': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/comments': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/likes': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      bypass: function(req, res, options) {
          // Only proxy POST requests, bypass others
          if (req.method !== 'POST') {
            return req.url;
          }
        }
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
