import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { 'heroui-vue': new URL('../src/index.ts', import.meta.url).pathname } },
})
