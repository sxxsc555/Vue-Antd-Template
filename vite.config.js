import { defineConfig } from 'vite'
import { svgBuilder } from './src/utils/svgBuilder'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolve = (dir) => path.join(__dirname, dir)

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    svgBuilder('./src/assets/icons/svg/')
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      'images': resolve('src/assets/images')
    }
  },
  server: {
    open: true,
    host: '0.0.0.0'
  },
  build:{
    brotliSize: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局引入基本样式规范文件
        additionalData: `
          @import './src/styles/standard-style.scss';
        `
      }
    }
  }
})
