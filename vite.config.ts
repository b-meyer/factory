import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   server: {
      port: 51234,
      strictPort: true,
   },
   plugins: [
      vue(),
      tailwindcss()
   ],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
      },
   },
})
