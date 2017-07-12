import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../packages/style/normalize.css'
import '../packages/style/constant.less'
import App from './App.vue'
import layout from '@layout'
// import elcomponents from '../lib/elcomponents.min.js'
Vue.use(ElementUI)
Vue.use(layout)
const a = new Vue({
  el: '#app',
  render: h => h(App)
})
console.log(a)
