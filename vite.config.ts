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
      '@': resolve('src')
    }
  },
  server: {
    open: true,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      // 指定文件输出的配置
      output: {
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'test/[name]-[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name]-[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局引入基本样式规范文件
        additionalData: `
          @import './src/styles/standard-style.scss';
        `
      }
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove()
              }
            }
          }
        }
      ]
    }
  }
})
