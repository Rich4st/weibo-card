import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { alias } from './alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias,
  },
  base: './',
})
