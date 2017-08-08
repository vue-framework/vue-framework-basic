import index from './src'
import temp from './src/index.vue'

/* istanbul ignore next */
index.install = function (Vue) {
  Vue.component(temp.name, temp)
  Vue.prototype.$excelup = index
}

export default index
