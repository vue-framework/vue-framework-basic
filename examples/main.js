import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../packages/style/normalize.css'
import '../packages/style/constant.less'
import App from './App.vue'
import layout from '@layout'
import components from '@components'
// router start
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: require('auto-router'),
  mode: 'history',
  base: '/'
})
// router end

Vue.use(ElementUI)
Vue.use(layout)
Vue.use(components)
const a = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
console.log(a)
