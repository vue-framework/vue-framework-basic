import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../packages/style/normalize.css'
import '../packages/style/constant.less'
import App from './App.vue'
import layout from '@layout'
import components from '@components'
import utils from '@utils'
// router start
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let autoRouter = require('auto-router')
routeMeta(autoRouter.routes)
const router = new VueRouter(autoRouter)
// router end

Vue.use(ElementUI)
Vue.use(layout)
Vue.use(components)
Vue.use(utils)

const a = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
console.log(a)

function routeMeta (data) {
  console.log(1)
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    if (item.title && (!item.meta || !item.meta.title)) {
      item.meta = Object.assign({name: item.title}, item.meta)
    }
    if (item.children && item.children.length) {
      routeMeta(item.children)
    }
  }
  console.log(data)
}
