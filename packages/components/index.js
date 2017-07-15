
import RichEditor from './basel-rich-editor'
import inputTree from './basel-input-tree'
import leftNav from './basel-left-nav'
const components = [
  RichEditor,
  inputTree,
  leftNav
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

export default { install, RichEditor, inputTree, leftNav }
