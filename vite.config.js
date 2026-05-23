import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path must be '/' for BrowserRouter to resolve assets correctly from the root domain
  base: '/',
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
      hostname: 'https://www.yatrago.com',
      dynamicRoutes: [
        '/tour-packages',
        '/destinations',
        '/activity',
        '/contact',
        '/about-us',
        '/chardham-yatra-from-haridwar',
        '/kedarnath-tour-package',
        '/rishikesh-river-rafting',
        '/haridwar-taxi-service',
        '/auli-tour-package',
        '/chopta-tour-package',
        '/badrinath-tour-package',
        '/dodham-yatra',
        '/rishikesh-adventure-activities',
        '/blog',
        '/blog/best-time-for-kedarnath-yatra',
        '/blog/chardham-packing-list',
        '/blog/haridwar-to-kedarnath-distance'
      ]
    })
  ],
}))