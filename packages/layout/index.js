
import fixedAuto from './layout-fixed-auto'

const components = [
  fixedAuto
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => {
    component.install(Vue)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export default { install, fixedAuto }
