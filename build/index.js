var path = require('path')
var utils = require('./utils')

module.exports = {
  init: function (config) {
    if (process.env.NODE_ENV === 'production') {
      this.dev()
    } else if (process.env.NODE_ENV === 'development') {
      this.build()
    }
  },
  dev: function (config) {
    config = merge(require('../config'), config)
    require('./dev-server')(config)
  },
  build: function (config) {
    config = merge(require('../config'), config)
    require('./build')(config)
  },
  geEntry: utils.geEntry
}

function merge (conf1, conf2) {
  if (conf2.webpack.entry) {
    conf1.webpack.entry = conf2.webpack.entry
  }
  let merge1 = require('webpack-merge')
  let conf = merge1(conf1, conf2)
  conf.webpack.output.path = path.resolve(process.cwd(), conf.webpack.output.path)
  conf.common.codeFolder = conf.common.codeFolder.concat(conf.common.assetsRoot).map(function (item) {
    return utils.rootPath(item)
  })
  if (conf.common.vendor && conf.common.vendor !== 'module') {
    conf.webpack.entry.vendor = conf.common.vendor
  }
  return conf
}
