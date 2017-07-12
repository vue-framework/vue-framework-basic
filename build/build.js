require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var chalk = require('chalk')
var webpack = require('webpack')
var getProdWebpackConfig = require('./webpack.prod.conf')
var spinner = ora('打包生产环境...')

module.exports = function (config) {
  spinner.start()
  rm(config.webpack.output.path, err => {
    if (err) throw err
    webpack(getProdWebpackConfig(config), function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      console.log(chalk.cyan('打包完成'))
    })
  })
}
