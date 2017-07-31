
import RichEditor from './basel-rich-editor'
import inputTree from './basel-input-tree'
import leftNav from './basel-left-nav'
import form from './basel-form'
import address from './basel-address'
import table from './basel-table'
const components = [
  RichEditor,
  inputTree,
  leftNav,
  address,
  table,
  form
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

export default { install, RichEditor, inputTree, leftNav, address, form, table}
