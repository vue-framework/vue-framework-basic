import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './components/bas-input-tree.vue'
// import elcomponents from '@elcomponents'
import elcomponents from '../lib/elcomponents.min.js'
Vue.use(ElementUI)
Vue.use(elcomponents)
const a = new Vue({
  el: '#app',
  render: h => h(App)
})
console.log(a)
