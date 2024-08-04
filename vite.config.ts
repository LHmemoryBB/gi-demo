import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv

  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts'
      }),
      Components({
        // 指定组件位置, 默认是src/components 自动导入自定义组件
        dirs: ['src/components'],
        extensions: ['vue'],
        // 配置文件生成位置
        dts: 'src/components.d.ts'
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: './src/mock/', // 目录位置
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && true,
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from '../src/mock/index';
          setupProdMockServer();
        `
      })
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': path.resolve(__dirname, 'src')
        
      }
    },
    base: env.VITE_PUBLIC_PATH,
    // 引入sass全局样式变量
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL, // 测试
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          ws: true, //websocket支持
          // rewrite: (path: any) => path.replace(/^\/api/, ""),
        },
        "/VerificationCode": {
          target: env.VITE_API_VERIFICATION_CODE,
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          ws: true, //websocket支持
          rewrite: (path: any) => path.replace(/^\/VerificationCode/, ""),
        },
      }
    },
    // 构建
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        },
        format: {
          // 删除注释
          comments: false
        }
      },
      chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
    }
  }
})
