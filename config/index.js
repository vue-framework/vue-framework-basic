
module.exports = {
  webpack: {
    context: process.cwd(),
    entry: {
      app: 'main.js'
    },
    output: {
      publicPath: '/',
      path: 'dist',
      filename: 'js/[name].min.js?[hash]'
    },
    externals: [], // 不需要打包文件
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 省略后缀名
      alias: { }// 别名
    }
  },
  common: {
    vendor: 'module',
    codeFolder: [],  // babel eslint 解析inclue
    static: false, // 静态文件地址'./static'
    assetsRoot: 'src'
  },
  build: {
    env: require('./prod.env'),
    index: 'index.html',
    productionSourceMap: true, // 代码调试mao
    productionGzip: false, // 压缩
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: true, // 打包后可视化提示
    extractCss: true // 导出css
  },
  dev: {
    env: require('./dev.env'),
    index: 'index.html',
    port: 8080,
    autoOpenBrowser: true,
    proxyTable: {}, // 代理
    cssSourceMap: true // 开启cssmap
  },
  router: {
    lazy: true, // 是否懒加载
    path: './src', // 需要被路由代码地址
    empty: 'empty' // 404文件名
  }
}
