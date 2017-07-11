module.exports = function (config) {
  if (process.env.NODE_ENV === 'production') {
    require('build')
  } else if (process.env.NODE_ENV === 'development') {
    require('dev-server')
  }
}
