var path = require('path')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HappyPack = require('happypack')

function getBaseWebpackConfig (config) {
  let webpackConfig = {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: config.common.codeFolder,
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.vue$/,
          loader: 'happypack/loader',
          options: vueLoaderConfig(config.build.extractCss)
        },
        {
          test: /\.js$/,
          // include: config.common.codeFolder,
          exclude: /(node_modules)/,
          loader: 'happypack/loader',
          options: {
            id: 'babel'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(config.common.static || 'static', 'img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(config.common.static || 'static', 'fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    plugins: [
      new HappyPack({
        id: 'babel',
        loaders: [ 'babel-loader' ]
      }),
      new HappyPack({
        id: 'vue',
        loaders: [ 'vue-loader' ]
      })
    ]
  }
  const name = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
  if (config[name].index) {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config[name].index,
      inject: true,
      minify: {
        removeComments: process.env.NODE_ENV === 'production',
        collapseWhitespace: process.env.NODE_ENV === 'production',
        removeAttributeQuotes: process.env.NODE_ENV === 'production'
      },
      chunksSortMode: 'dependency'
    }))
  }
  // 添加router
  if (config.router) {
    webpackConfig.module.rules.splice(1, 0, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: path.resolve(__dirname, './loader/auto-router-loader'),
      options: config.router
    })
  }
  return webpackConfig
}
module.exports = getBaseWebpackConfig
