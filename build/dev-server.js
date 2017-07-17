
var opn = require('opn')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var getDevWebpackConfig = require('./webpack.dev.conf')
var utils = require('./utils')
module.exports = function (config) {
  require('./check-versions')()

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  }

  let webpackConfig = getDevWebpackConfig(config)
  // 端口号
  var port = process.env.PORT || config.dev.port
  // 自动打开浏览器
  var autoOpenBrowser = !!config.dev.autoOpenBrowser
  // 设置代理
  // https://github.com/chimurai/http-proxy-middleware
  var proxyTable = config.dev.proxyTable

  var app = express()
  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => { }
  })
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  var staticPath = config.common.static
  if (staticPath) {
    let staticArr = staticPath.split('/')
    app.use('/' + staticArr[staticArr.length - 1], express.static(utils.rootPath(staticPath)))
  }

  var uri = 'http://localhost:' + port

  console.log('> Starting dev server...')
  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
  })

  app.listen(port)
}
