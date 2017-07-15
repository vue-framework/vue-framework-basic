import fixedauto from './layout-fixedauto'
import fixedFixedauto from './layout-fixed-fixedAuto'
const components = [
  fixedauto,
  fixedFixedauto
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

export default { install, fixedauto, fixedFixedauto }
