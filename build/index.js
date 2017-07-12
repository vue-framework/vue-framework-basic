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
    config = Object.assign(require('../config'), config)
    require('./dev-server')(config)
  },
  build: function (config) {
    config = Object.assign(require('../config'), config)
    require('./build')(config)
  },
  geEntry: utils.geEntry
}
