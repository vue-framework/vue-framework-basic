var utils = require('./utils')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = function (isExt) {
  return {
    loaders: utils.cssLoaders({
      sourceMap: !isProduction,
      extractCss: isProduction ? isExt : true
    }),
    id: 'vue'
  }
}
