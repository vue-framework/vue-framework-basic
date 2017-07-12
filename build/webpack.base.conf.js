var path = require('path')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function getBaseWebpackConfig (config) {
  let webpackConfig = {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: config.common.codeFolder,
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: config.common.codeFolder
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(config.common.static, 'img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(config.common.static, 'fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    plugins: [
      // new HappyPack({
      //   loaders: [ 'babel?presets[]=es2015' ]
      // })
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
  return webpackConfig
}
module.exports = getBaseWebpackConfig
