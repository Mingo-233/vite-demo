import { defineConfig, normalizePath, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import autoprefixer from 'autoprefixer';

const resolveExternalsPlugin = require('vite-plugin-resolve-externals');

const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'https://yun.baoxiaohe.com/';
const isAnalyze = process.env.BUILD_TYPE === 'analyze';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/assets/style/theme.less')
);
console.log(process.env.NODE_ENV);
export default ({ mode }) => {
  // 第一个是.env后面的名字，第二个是绝对路径，第三个参数是你环境变量名的前缀，在vite中默认是VITE_。
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const { VITE_PUBLIC_PATH, VITE_APP_DOMAIN, VITE_NODE_ENV, VITE_APP_SITE } =
    process.env;
  console.log(VITE_PUBLIC_PATH);
  // https://vitejs.dev/config/
  const plugins = [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
      dts: true // enabled by default if `typescript` is installed
    })
    // resolveExternalsPlugin({
    //   vue: 'Vue'
    // })
  ];
  if (isAnalyze) {
    plugins.push(visualizer({ open: true, gzipSize: true, brotliSize: true }));
  }
  return defineConfig({
    base: isProduction ? CDN_URL : '/',
    // 在开发或生产中服务时的基本公共路径 可以是绝对路径（例如http开头）也可以相对路径
    // base: CDN_URL,
    // 手动指定项目根目录位置 这样把index。html 放src下也能正常启动
    root: path.join(__dirname, 'src'),
    plugins,
    server: {
      host: '0.0.0.0'
      // port: 3300,
      // open: false,
      // https: false,
      // proxy: {
      //   '/api': {
      //     target: `https://${VITE_APP_SITE || 'www'}.${
      //       VITE_APP_DOMAIN || 'baoxiaohe.fun'
      //     }`,
      //     changeOrigin: true,
      //     cookieDomainRewrite: {
      //       '.baoxiaohe.fun':
      //         VITE_NODE_ENV !== 'production' ? 'localhost' : 'baoxiaohe.fun',
      //       '.baoxiaohe.com':
      //         VITE_NODE_ENV !== 'production' ? 'localhost' : 'baoxiaohe.com'
      //     }
      //   }
      // }
    },

    build: {
      outDir: path.join(__dirname, 'dist'),
      // VITE_PUBLIC_PATH
      // assetsDir: VITE_PUBLIC_PATH,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      minify: 'terser',
      commonjsOptions: {
        // 当有 cmjs 或者esm混合使用的第三方资源时，可以统一转换为esm格式
        transformMixedEsModules: true
      },
      rollupOptions: {
        output: {
          chunkFileNames: `${VITE_PUBLIC_PATH}/js/[name]-[hash].js`,
          entryFileNames: `${VITE_PUBLIC_PATH}/js/[name]-[hash].js`,
          // assetFileNames: 'stc/img/[name]-[hash].[ext]',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              extType = 'media';
            } else if (/\.(css)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'css';
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts';
            }
            return `${VITE_PUBLIC_PATH}/${extType}/[name]-[hash][extname]`;
          },
          manualChunks: {
            // 将 vue 相关库打包成单独的 chunk 中
            'vue-vendor': ['vue'],
            // 将 Lodash 库的代码单独打包
            // lodash: ['lodash-es']
            // 将组件库的代码打包
            // library: ['antd', '@arco-design/web-react']
            'axios-vendor': ['axios'],
            library: ['ant-design-vue']
          }
        }
      }
    },
    // css 相关的配置
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
          })
        ]
      },
      preprocessorOptions: {
        less: {
          // additionalData 的内容会在每个 scss 文件的开头自动注入
          additionalData: `@import "${variablePath}";`,
          modifyVars: {
            'primary-color': '#ff7714'
          },
          javascriptEnabled: true
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
};
