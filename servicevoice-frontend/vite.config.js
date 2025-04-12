// vite.config.js
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
        icons: [
          {
            src: '/icons/icon-192x192.png', // Add your icon
            sizes: '192x192',
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
