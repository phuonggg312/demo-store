import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
        unused: true,
        dead_code: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // Để Vite tự động tối ưu
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
