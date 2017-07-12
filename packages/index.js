const build = require('../build')
const config = {
  webpack: {
    entry: build.geEntry({
      components: './packages/components',
      layout: './packages/layout'
    }),
    output: {
      path: 'lib',
      filename: '[name].min.js',
      libraryTarget: 'commonjs2'
    },
    externals: [
      'vue',
      /^element-ui\/.+$/
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': './packages',
        '@components': './packages/components',
        '@layout': './packages/layout',
        '@dirictive': './packages/dirictive',
        '@elcomponents': './packages/elcomponents',
        '@filter': './packages/filter',
        '@utils': './packages/utils'
      }
    }
  },
  common: {
    assetsRoot: 'packages'
  },
  build: {
    index: false,
    extractCss: false,
    productionGzip: true, // 压缩
    productionGzipExtensions: ['js', 'css']
  }
}

build.build(config)
