var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let entry = {
  app: './examples'
}

// 添加热加载
Object.keys(entry).forEach(function (name) {
  entry[name] = ['./build/dev-client'].concat(entry[name])
})

module.exports = merge(baseWebpackConfig, {
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
})
