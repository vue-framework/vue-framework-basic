
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
        '@utils': '../packages/utils',
        '@static': '../packages/static'
      }
    }
  },
  common: {
    static: false, // 静态文件地址'./static'
    assetsRoot: 'examples'
  },
  dev: {
    index: './examples/index.html',
    port: 8081,
    autoOpenBrowser: false,
    proxyTable: {}, // 代理
    cssSourceMap: true // 开启cssmap
  },
  router: {
    lazy: true, // 是否懒加载
    path: './examples/pages' // 需要被路由代码地址
  }
}

build.dev(config)
