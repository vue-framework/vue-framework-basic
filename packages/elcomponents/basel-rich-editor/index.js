import basElRichEditor from './src/rich-editor.vue'

/* istanbul ignore next */
basElRichEditor.install = function (Vue) {
  Vue.component(basElRichEditor.name, basElRichEditor)
}

export default basElRichEditor
