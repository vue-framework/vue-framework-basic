var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var getbaseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = function getDevWebpackConfig (config) {
  let entry = config.webpack.entry
// 添加热加载
  Object.keys(entry).forEach(function (name) {
    entry[name] = ['./build/dev-client'].concat(entry[name])
  })
  var myConfig = merge(getbaseWebpackConfig(config), {
    module: {
      rules: utils.styleLoaders({ sourceMap: true })
    },
  // 开发环境中添加map
    devtool: '#cheap-module-eval-source-map',
    plugins: [
    // 设置环境变量
      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),
    // 热替换
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    // 友好错误
      new FriendlyErrorsPlugin()
    ]
  }, config.webpack)
  return myConfig
}
