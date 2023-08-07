import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import { resolve } from 'path'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig(({ command, mode }) => ({
  server: {
    port: 53333,
    strictPort: true,
  },
  preview: {
    port: 53333,
  },
  plugins: [
    vue(),
    checker({ typescript: true })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')(),
        require('autoprefixer')(),
        require('cssnano')()
      ]
    }
  },
}));