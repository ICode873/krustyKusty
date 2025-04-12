// krustyKusty/servicevoice-frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ServiceVoice',
        short_name: 'SV',
        description: 'A PWA for home service businesses to rate customers.',
        theme_color: '#2F6B4F',
        background_color: '#2F6B4F',
        display: 'standalone',
        icons: [
          {
            src: '/icons/hammer-gray-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/hammer-gray-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offline-cache',
              expiration: { maxEntries: 50 },
            },
          },
        ],
      },
    }),
  ],
})
