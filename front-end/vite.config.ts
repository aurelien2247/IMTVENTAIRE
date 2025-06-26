import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// Configuration Vite pour le projet IMT VENTAIRE
export default defineConfig({
  plugins: [
    // Support React avec SWC pour une compilation rapide
    react(),

    // Intégration de TailwindCSS
    tailwindcss(),

    // Configuration PWA
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'IMT VENTAIRE',
        short_name: 'IMTVENTAIRE',
        description: 'Application d\'inventaire pour Thierry. Développée par Hugo, Enzo, Mathilde et Aurélien.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],

  // Aliases personnalisés pour des imports plus clairs
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Optimisation : exclure certains modules du pré-bundling
  optimizeDeps: {
    exclude: ['react-barcode-scanner'],
  },
});