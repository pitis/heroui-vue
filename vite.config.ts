import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { 'heroui-vue': new URL('./src/index.ts', import.meta.url).pathname } },
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index' },
    rollupOptions: { external: [/^vue/, /^reka-ui/, /^@heroui\//, /^@internationalized\//, /^@vueuse\//, 'tailwind-variants'] },
  },
  test: { environment: 'happy-dom' },
})
