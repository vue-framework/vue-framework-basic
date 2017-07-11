import fixedAuto from './src/fixed-auto.vue'

fixedAuto.install = function (Vue) {
  Vue.component(fixedAuto.name, fixedAuto)
}

export default fixedAuto
