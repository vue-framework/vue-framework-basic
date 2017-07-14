var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var getbaseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function getProdWebpackConfig (config) {
  var webpackConfig = merge(getbaseWebpackConfig(config), config.webpack, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: false,
        extractCss: config.build.extractCss
      })
    },
    devtool: false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      }),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   },
      //   sourceMap: false
      // }),
      // 多个文件引用同一个css,去重
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  })
  // vendor
  if (config.common.vendor) {
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false
        }
        return module.context && module.context.indexOf('node_modules') !== -1
      },
      minSize: 1000
    }))
  }
  // 压缩
  if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
  }
  // 来分析 Webpack 生成的包体组成并且以可视化的方式反馈给开发者
  if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
  // 导出css
  if (config.build.extractCss) {
    webpackConfig.plugins.push(new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }))
  }
  // 复制静态文件
  if (config.common.static) {
    webpackConfig.plugins.push(new CopyWebpackPlugin([
      {
        from: config.common.static,
        to: 'static',
        ignore: ['.*']
      }
    ]))
  }
  return webpackConfig
}

module.exports = getProdWebpackConfig
