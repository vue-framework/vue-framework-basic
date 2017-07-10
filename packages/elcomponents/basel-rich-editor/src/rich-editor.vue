<template>
  <div ref="editor">
  </div>
</template>
<script> 

export default {
  name: 'ElRichEditor',
  componentName: 'ElRichEditor',
  data() {
    return {
      defaultConfig: {
        serverUrl: '',
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo'],
          ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
        ],
        autoHeightEnabled: true,
        autoWidthEnabled: true,
        autoFloatEnabled: true,
        initialFrameWidth: '100%',
        initialFrameHeight: '100%'
      },
      id: 'ueditor_id_' + Math.random()*10000,
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: function () {
        return {
        }
      },
    }
  },
  // watch: {
  //   value: function value(val, oldVal) {
  //     this.editor = UE.getEditor(this.id, this.config);
  //     if (val !== null) {
  //       this.editor.setContent(val);
  //     }
  //   },
  // },
  mounted() {
    if (typeof UE == 'undefined') {
      let message = '找不到 UE 对象 , 请在头部引用 ueditor 组件\r\n' +
        '"http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js"\r\n' +
        '"http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.js"'
      console.error(message)
      return
    }
    this.$nextTick(function f1() {
      // 保证 this.$el 已经插入文档
      this.$refs.editor.id = this.id
      let config = Object.assign(this.defaultConfig, this.config)
      this.editor = UE.getEditor(this.id, config)
      this.editor.ready(function f2() {
        this.editor.setContent(this.value)
        this.editor.addListener("contentChange", function () {
          const wordCount = this.editor.getContentLength(true)
          const content = this.editor.getContent()
          const plainTxt = this.editor.getPlainTxt()
          this.$emit('input', content)
        }.bind(this))

        this.$emit('ready', this.editor);
      }.bind(this));
    });
  }
}
</script>