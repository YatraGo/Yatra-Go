import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use a relative base path for production to ensure assets load correctly on GitHub Pages
  base: mode === 'production' ? './' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor-react'
            if (id.includes('framer-motion') || id.includes('lucide-react')) return 'vendor-ui'
            if (id.includes('firebase')) return 'vendor-firebase'
          }
        }
      }
    }
  },
  plugins: [
    tailwindcss(),
    react(),
    Sitemap({
      hostname: 'https://yatrago.com',
      dynamicRoutes: [
        '/tour-packages',
        '/destinations',
        '/contact',
        '/about-us',
      ]
    })
  ],
}))