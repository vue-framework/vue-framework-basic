
import RichEditor from './basel-rich-editor'
import inputTree from './basel-input-tree'
import leftNav from './basel-left-nav'
import form from './basel-form'
import address from './basel-address'
import table from './basel-table'
import tree from './basel-tree'
import progress from './basel-progress'
import editTable from './basel-edit-table'
import selectTag from './basel-select-tag'
import baselPopTreeSelect from './basel-pop-tree-select'
import excelup from './basel-excel-up'

const components = [
  RichEditor,
  inputTree,
  leftNav,
  address,
  table,
  form,
  tree,
  progress,
  editTable,
  selectTag,
  baselPopTreeSelect,
  excelup
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

export default { install, RichEditor, inputTree, leftNav, address, form, table, tree, progress, editTable, selectTag, baselPopTreeSelect, excelup }
