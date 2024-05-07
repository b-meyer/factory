import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dns from 'dns'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

dns.setDefaultResultOrder('verbatim')

export default defineConfig(({ command, mode }) => ({
  server: {
    port: 51234,
    strictPort: true,
  },
  preview: {
    port: 51234,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        cssnano()
      ]
    }
  },
}));