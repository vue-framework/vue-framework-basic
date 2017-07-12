
module.exports = {
  webpack: {
    context: process.cwd(),
    entry: {
      app: 'main.js'
    },
    output: {
      path: 'dist',
      filename: '[name].min.js',
      publicPath: '/'
    },
    externals: [], // 不需要打包文件
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 省略后缀名
      alias: { }// 别名
    }
  },
  common: {
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
    bundleAnalyzerReport: false, // 打包后可视化提示
    extractCss: true // 导出css
  },
  dev: {
    env: require('./dev.env'),
    index: 'index.html',
    port: 8080,
    autoOpenBrowser: true,
    proxyTable: {}, // 代理
    cssSourceMap: true // 开启cssmap
  }
}