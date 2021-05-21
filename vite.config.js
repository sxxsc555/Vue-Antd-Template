import { defineConfig } from 'vite'
import { svgBuilder } from './src/utils/svgBuilder'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolve = (dir) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/assets/icons/svg/')],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  base: './'
})
