import {defineConfig, loadEnv} from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },

    build: {
      target: 'esnext',
    },
    server: {
      hmr: true,
    },

    optimizeDeps: {
      exclude: ['jspdf'],
    },
  }
})
