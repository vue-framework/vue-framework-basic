
import RichEditor from './basel-rich-editor'
import ElInputTree from './basel-input-tree'

const components = [
  RichEditor,
  ElInputTree
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

export default { install, RichEditor, ElInputTree }
