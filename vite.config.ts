import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { 'heroui-vue': new URL('./src/index.ts', import.meta.url).pathname } },
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index' },
    rollupOptions: {
      external: [/^vue/, /^reka-ui/, /^@heroui\//, /^@internationalized\//, /^@vueuse\//, 'tailwind-variants'],
      // One file per module, not one bundle. A component is put together at the top of its module
      // (`Object.assign(Root, { Trigger, … })`), a call no bundler can prove free of effects, so in a
      // single file every component stayed in every app, and all of Reka UI with them. With a file
      // each and `sideEffects: false`, a module nothing imports is never loaded.
      output: { preserveModules: true, preserveModulesRoot: 'src', entryFileNames: '[name].js' },
    },
  },
  test: { environment: 'happy-dom' },
})
