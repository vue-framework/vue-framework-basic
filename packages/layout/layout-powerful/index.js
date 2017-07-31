import powerful from './src/index.vue'

powerful.install = function (Vue) {
  Vue.component(powerful.name, powerful)
}

export default powerful
