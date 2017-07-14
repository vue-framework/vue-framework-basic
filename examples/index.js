
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
  dev: {
    index: './examples/index.html',
    port: 8080,
    autoOpenBrowser: true,
    proxyTable: {}, // 代理
    cssSourceMap: true // 开启cssmap
  }
}

build.dev(config)
