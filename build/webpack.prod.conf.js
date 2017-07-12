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
        extract: config.build.extractCss
      })
    },
    devtool: false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      }),
      // 多个文件引用同一个css,去重
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),,
      // 导包module到vendor
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            utils.rootPath('node_modules')
          ) === 0
          )
        }
      })
    ]
  })
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
  // 导出为css文件
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
  if (config.webpack.entry.vendor) {
  // 打包本地lib文件到manifest，入口名字为vendor
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }))
  }
}

module.exports = getProdWebpackConfig
