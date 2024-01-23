import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'http://190.216.66.210:10287',
        changeOrigin: true,
        secure: false,
        // Puedes incluir otras configuraciones aquí si es necesario
      },
      '/analytics/api': {
        target: 'http://190.216.66.210:10288',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/analytics/, ''),
      },
      '/logistics/api': {
        target: 'http://190.216.66.210:10291',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/logistics/, ''),
      },
    },
  },
})
