import index from './src/index.vue'

/* istanbul ignore next */
index.install = function (Vue) {
  Vue.component(index.name, index)
}

export default index
