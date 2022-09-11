import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { alias } from './alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias,
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    rollupOptions: {
      output: {
        footer: 'umd',
      },
    },
  },
})
