<style scoped>
  .operation {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 54%;
    overflow: auto;
    border-right: 1px solid #ccc;
    padding: 10px;
  }
  .utilForm {
    width: 100%;
  }
  .buildform {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 46%;
    right: 0;
    padding: 20px;
    overflow: auto;
  }
</style>
<template>
  <div>
    <div class="operation">
      <div class="utilForm">
        <bas-form :data="utils.data" :value="utils.value" :props="utils.props"></bas-form>
      </div>
    </div>
    <div class="buildform">
      <bas-form :data="build.data" :value="build.value" :props="build.props"></bas-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        utils: {
          props: {
            ref: 'form',
            labelWidth: '100px',
            rules: {},
            bind: {
              attrs: {
                spellcheck: false
              }
            }
          },
          data: [{
            tag: 'text',
            label: 'label宽度',
            prop: 'labelWidth'
          },
          {
            tag: 'radio',
            label: '操作',
            prop: 'operation',
            options: [{
              label: '添加',
              value: 1
            },
            {
              label: '删除',
              value: 2
            }
            ]
          },
          {
            tag: 'select',
            label: '标签类型',
            show: [{
              prop: 'operation',
              value: 1
            }],
            showProp: 'operation',
            showValue: 1,
            prop: 'tagType',
            bind: {
              on: {
                click: function () {
                  this.add()
                }.bind(this)
              }
            },
            options: tags
          },
          {
            tag: 'text',
            label: '标签名',
            show: [{
              prop: 'operation',
              value: 1
            }],
            prop: 'tagLabel'
          },
          {
            tag: 'text',
            label: '字段名',
            show: [{
              prop: 'operation',
              value: 1
            },
            {
              prop: 'tagType',
              value: 'button',
              no: true
            }
            ],
            prop: 'tagProp'
          },
          {
            tag: 'textarea',
            label: '选择项',
            bind: {
              props: {
                autosize: true
              }
            },
            show: [
              {
                prop: 'operation',
                value: 1
              },
              {
                prop: 'tagType',
                value: ['text', 'title'],
                no: true
              }
            ],
            prop: 'options'
          },
          {
            tag: 'textarea',
            label: '属性',
            bind: {
              props: {
                autosize: true
              }
            },
            show: [
              {
                prop: 'operation',
                value: 1
              },
              {
                prop: 'tagType',
                value: 'title',
                no: true
              }
            ],
            prop: 'bind'
          },
          {
            tag: 'textarea',
            label: '显示条件',
            bind: {
              props: {
                autosize: true
              }
            },
            show: [
              {
                prop: 'operation',
                value: 1
              },
              {
                prop: 'tagType',
                value: 'title',
                no: true
              }
            ],
            prop: 'show'
          },
          {
            tag: 'button',
            show: [{
              prop: 'operation',
              value: 1
            }],
            value: [{
              title: '添加',
              type: 'primary',
              click: () => {
                this.addTag()
              }
            }]
          },
          {
            tag: 'button',
            value: [{
              title: '打印数据',
              type: 'primary',
              click: () => {
                console.log(JSON.stringify(this.build, null, 2))
              }
            }]
          }
          ],
          value: {
            operation: 1, // 操作 1添加 2删除
            labelWidth: '100px', // 标签宽度
            tagType: 'text', // 标签类型
            tagLabel: '', // 标签名
            tagProp: '', // 标签字段名
            options: options, // 标签配置
            bind: bind, // h函数绑定
            show: show// 显示条件
          }
        },
        build: {
          props: {
            ref: 'form',
            rules: {}
          },
          data: [],
          value: {}
        }
      }
    },
    methods: {
      setlabelWidth () {
        this.build.props.labelWidth = this.utils.value.labelWidth
      },
      addTag () {
        let value = this.utils.value
        this.addValue(value.tagProp, value.tagType)
        // 添加标签
        if (value.tagType === 'title') {
          this.addTitle(value)
        } else {
          this.addNormal(value)
        }
      },
      addTitle (value) {
        this.build.data.push({
          tag: value.tagType,
          value: value.tagLabel
        })
      },
      addNormal (value) {
        let obj = {
          tag: value.tagType,
          label: value.tagLabel,
          prop: value.tagProp,
          bind: {}
        }
        if (value.bind) {
          obj.bind = eval('(' + value.bind + ')')
        }
        if (value.show) {
          obj.show = eval('(' + value.show + ')')
        }
        if (value.options) {
          obj.options = eval('(' + value.options + ')')
        }
        this.build.data.push(obj)
      },
      addValue (prop, tagType) {
        if (~['title', 'button'].indexOf(tagType)) {
          return false
        }
        if (~['number'].indexOf(tagType)) {
          this.$set(this.build.value, prop, 100)
        } else if (~['address', 'inputTree', 'checkbox', 'upload'].indexOf(tagType)) {
          this.$set(this.build.value, prop, [])
        } else {
          this.$set(this.build.value, prop, '')
        }
      }
    },
    created () {
      this.setlabelWidth()
    },
    watch: {
      'utils.value': {
        handler: function (n) {
          this.setlabelWidth()
        },
        deep: true
      },
      'build.value': {
        handler: function (n) {
          console.log(n)
        },
        deep: true
      }
    }
  }
  var options = `[
  {label:'选项一',value:'0'}
  ]`
  var show = `[
  //{是否显示条件
  //prop: 'operation',属性名
  //value: 1,//值
  //no:true//true为等于 不填写false不等于
  //}
  ]`
  var bind = `{
  // 和 v - bind: class 一样的 API
  class: {
  },
  // 和v - bind: style 一样的 API
  style: {
  },
  // 正常的 HTML 特性
  attrs: {
  },
  // 组件 props
  props: {
  },
  // DOM 属性
  domProps: {
  },
  // 事件监听器基于on
  on: {
  },
  // 监听原生事件
  nativeOn: {
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  directives: [],
  // 其他特殊顶层属性
  key: '',
  ref: ''
  }`
  var tags = [{
    label: '标题',
    value: 'title'
  }, {
    label: '输入框',
    value: 'text'
  },
  {
    label: '文本域',
    value: 'textarea'
  },
  {
    label: '省市区选择',
    value: 'address'
  },
  {
    label: '计数器',
    value: 'number'
  },
  {
    label: '下拉框',
    value: 'select'
  },
  {
    label: '级联选择器',
    value: 'cascader'
  },
  {
    label: '下拉树',
    value: 'inputTree'
  },
  {
    label: '单选框组',
    value: 'radio'
  },
  {
    label: '多选框组',
    value: 'checkbox'
  },
  {
    label: '评分',
    value: 'rate'
  },
  {
    label: '开关',
    value: 'switch'
  },
  {
    label: '滑块',
    value: 'slider'
  },
  {
    label: '时间选择器',
    value: 'time'
  },
  {
    label: '日期选择器',
    value: 'date'
  },
  {
    label: '日期时间选择器',
    value: 'datetime'
  },
  {
    label: '颜色选择器',
    value: 'color'
  },
  {
    label: '上传',
    value: 'upload'
  },
  {
    label: '穿梭框',
    value: 'transfer'
  },
  {
    label: '按钮组',
    value: 'button'
  }
  ]
</script>
