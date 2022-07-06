import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';
// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx';
// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/assets/style/theme.less')
);
console.log(process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  // base: isProduction ? CDN_URL : '/',
  base: '/',
  // 手动指定项目根目录位置 这样把index。html 放src下也能正常启动
  root: path.join(__dirname, 'src'),
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: true // enabled by default if `typescript` is installed
    })
  ],
  server: {
    host: '0.0.0.0'
  },

  build: {
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 vue 相关库打包成单独的 chunk 中
          'vue-vendor': ['vue'],
          // 将 Lodash 库的代码单独打包
          // lodash: ['lodash-es']
          // 将组件库的代码打包
          // library: ['antd', '@arco-design/web-react']
          library: ['axios', 'ant-design-vue']
        }
      }
    }
  },
  // css 相关的配置
  css: {
    preprocessorOptions: {
      less: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },

  resolve: {
    // 别名配置
    alias: {
      // '&img': path.join(__dirname, 'src/assets/img'),

      '@': path.join(__dirname, 'src'),
      '@a': path.join(__dirname, 'src/assets')
    }
  }
});
