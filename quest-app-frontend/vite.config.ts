import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_BASE_URL_DEPLOY = 'https://quest-app-backend-05od.onrender.com';
const API_BASE_URL_TEST = 'http://localhost:8080';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/quest-app/',
  server: {
    port: 3000,
    proxy: {
      '/quest-app/api/users': {
        target: API_BASE_URL_DEPLOY,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/quest-app\/api/, ''),
      },
      '/quest-app/api/posts': {
        target: API_BASE_URL_DEPLOY,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/quest-app\/api/, ''),
      },
      '/quest-app/api/comments': {
        target: API_BASE_URL_DEPLOY,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/quest-app\/api/, ''),
      },
      '/quest-app/api/likes': {
        target: API_BASE_URL_DEPLOY,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/quest-app\/api/, ''),
      },
      '/quest-app/api/auth': {
        target: API_BASE_URL_DEPLOY,
        changeOrigin: true,
        secure: false,
        bypass: function(req, res, options) {
            // Only proxy POST requests, bypass others
            if (req.method !== 'POST') {
              return req.url;
            }
          },
        rewrite: (path) => path.replace(/^\/quest-app\/api/, ''),  
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
