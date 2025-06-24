import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import fs from 'fs'

const isDev = process.env.NODE_ENV !== 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: isDev
    ? {
        https: {
          key: fs.readFileSync('./ssl/localhost-key.pem'),
          cert: fs.readFileSync('./ssl/localhost.pem'),
        },
        host: true,
      }
    : {},
  optimizeDeps: {
    exclude: ["react-barcode-scanner"],
  }
})
