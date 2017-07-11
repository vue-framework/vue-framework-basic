module.exports = {
  port: 8081,
  entry: {
    js: path.resolve(__dirname, './index.js'),
    html: path.resolve(__dirname, './index.html')
  },
  output: path.resolve(__dirname, 'dist'),
  hot: true,
  assets: { // 资源文件设置(可选)
    path: '/assets', // 映射的路径 （必填）
    folder: path.resolve(__dirname, 'src/assets') // 文件所在目录 （必填)
  },
  modules: { // 配置 webpack 扩展，（有些 js 是从 cdn 上引用进来，如 jQuery, 这个是指使用 import $ from 'jquery' 时， 不需要将 jquery 打包到 main 中）
    '$': 'jQuery'
  },
  url: {
    open: true
  },
  proxy: []
}

var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, './index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    externals: [] // 不打包
  },
  dev: {
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static', // 映射的路径 （必填）
    assetsPublicPath: '/',
    proxyTable: {}, // 代理
    cssSourceMap: true
  }
}
