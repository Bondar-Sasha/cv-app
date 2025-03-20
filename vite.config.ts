import {defineConfig} from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    hmr: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
