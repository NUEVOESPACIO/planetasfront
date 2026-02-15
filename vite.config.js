import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escucha en todas las interfaces
    port: 5173,
    strictPort: false, // Si el puerto está ocupado, intenta otro
  },
})
