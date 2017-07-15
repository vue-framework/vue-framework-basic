
import fontIcon from './fontIcon'
import tool from './tool'
const utils = [
  fontIcon,
  tool
]

const install = function (Vue) {
  if (install.installed) return
  utils.map(util => {
    util.install(Vue)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export default { install, fontIcon, tool }
