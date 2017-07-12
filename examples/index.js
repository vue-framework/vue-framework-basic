
const build = require('../build')
let config = {
  webpack: {
    entry: {
      app: './examples/main.js'
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': '../packages',
        '@components': '../packages/components',
        '@layout': '../packages/layout',
        '@dirictive': '../packages/dirictive',
        '@elcomponents': '../packages/elcomponents',
        '@filter': '../packages/filter',
        '@utils': '../packages/utils'
      }
    }
  },
  common: {
    static: false, // 静态文件地址'./static'
    assetsRoot: 'examples'
  },
  build: {
    index: './examples/index.html',
    productionSourceMap: true, // 代码调试mao
    productionGzip: false, // 压缩
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: false, // 打包后可视化提示
    extractCss: true // 导出css
  },
  dev: {
    index: './examples/index.html',
    port: 8080,
    autoOpenBrowser: true,
    proxyTable: {}, // 代理
    cssSourceMap: true // 开启cssmap
  }
}

build.build(config)
