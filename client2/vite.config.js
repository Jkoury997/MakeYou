import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.0.0.110:8100',
        changeOrigin: true,
        secure: false,
        // Puedes incluir otras configuraciones aquí si es necesario
      },
    },
  },
})
