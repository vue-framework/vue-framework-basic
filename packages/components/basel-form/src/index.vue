<style>
  .basel-form .title {
    font-size: 18px;
    color: #333;
    font-weight: 500;
    margin-bottom: 12px;
    overflow: hidden;
    display: block;
  }
  .basel-form .title>span {
    display: inline-block;
    width: 4px;
    height: 21px;
    background: #333;
    margin-right: 8px;
    vertical-align: text-bottom;
  }
  .basel-form .uploadHide .el-upload {
    display: none;
  }
  .basel-form .btngroup .el-button+.el-button{
    margin-left:20px;
  }
  .basel-form>*{
    margin-bottom: 22px;
  }
  .basel-form .max-num{
    position: absolute;
    right: 10px;
    bottom: 0;
    color: #ccc;
  }
  .basel-form .el-form-item{
    display:inline-block;
    vertical-align: top;
  }
  .basel-form .clause{
    text-align: center;
    display: block;
  }
  .basel-form .prompt{
    color:#ccc;
  } 
  .basel-form .el-radio,.basel-form .el-checkbox{
    margin-left:10px;
  }
</style>
<script>
  var form = {
    text: {
      tag: 'el-input',
      bind: {
        props: {
          type: 'text'
        }
      }
    },
    textarea: {
      tag: 'el-input',
      bind: {
        props: {
          type: 'textarea',
          rows: 5
        }
      }
    },
    cascader: {
      tag: 'el-cascader'
    },
    number: {
      tag: 'el-input-number'
    },
    address: {
      tag: 'bas-address'
    },
    inputTree: {
      tag: 'bas-input-tree'
    },
    switch: {
      tag: 'el-switch'
    },
    slider: {
      tag: 'el-slider'
    },
    time: {
      tag: 'el-time-picker'
    },
    date: {
      tag: 'el-date-picker'
    },
    dateTime: {
      tag: 'el-date-picker'
    },
    color: {
      tag: 'el-color-picker'
    },
    transfer: {
      tag: 'el-transfer'
    },
    rate: {
      tag: 'el-rate',
      bind: {
        style: {
          marginTop: '8px'
        }
      }
    }
  }
  export default {
    name: 'BasForm',
    props: {
      data: {},
      value: {},
      props: {}
    },
    functional: true,
    render (h, c) {
      console.log('update')
      return h('el-form', merge(
        {props: Object.assign({
          model: c.props.value
        }, c.props.props),
          class: ['basel-form']
        },
        c.props.props.bind
        ), getFormItem(c.props.data))
      function getFormItem (data) {
        let child = []
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let show = true
          if (item.show && item.show.length) {
            for (let j = 0; j < item.show.length; j++) {
              let it = item.show[j]
              let val = c.props.value[it.prop]
              if (it.no) {
                if (it.value instanceof Array) {
                  if (~it.value.indexOf(val)) {
                    show = false
                    break
                  }
                } else {
                  if (val === it.value) {
                    show = false
                    break
                  }
                }
              } else {
                if (val instanceof Array) {
                  if (it.value.indexOf(val)) {
                    show = false
                    break
                  }
                } else {
                  if (val !== it.value) {
                    show = false
                    break
                  }
                }
              }
            }
          }
          if (!show) {
            item.hide = true
            child.push('')
          } else {
            item.hide = false
            if (item.tag === 'title') {
              child.push(< div class='title' > < span / > {
                item.value
              } < /div>)
            } else if (item.tag === 'clause') {
              let value = c.props.value[item.prop]
              let input = function (value) {
                c.props.value[item.prop] = value
              }
              child.push(h('el-checkbox', {
                class: 'clause',
                props: {
                  value: value
                },
                on: {
                  input: input
                }
              }, [item.temp, <a href={item.href} target='_blank'>{item.a}</a>]))
            } else if (item.tag === 'button') {
              let btns = []
              for (let i = 0; i < item.value.length; i++) {
                let btn = item.value[i]
                let obj = {
                  props: {
                    type: btn.type
                  }
                }
                if (btn.click) {
                  obj.nativeOn = {
                    click: btn.click
                  }
                }
                btns.push(h('el-button', obj, btn.title))
              }
              let style = {}
              if (item.left) {
                style.marginLeft = item.left
              } else {
                style.textAlign = 'center'
              }
              child.push(h('div', {
                class: ['btngroup'],
                style: style
              }, btns))
            } else {
              child.push(h('el-form-item', {
                props: {
                  prop: item.prop,
                  label: item.label
                },
                style: {
                  width: item.tow ? '50%' : '100%'
                }
              }, getItem(item)))
            }
          }
        }
        return child
      }
      function getItem (item) {
        let value = c.props.value[item.prop]
        let rule = c.props.props.rules && c.props.props.rules[item.prop]
        let prompt = h('span', {class: 'prompt'}, item.prompt)
        let input = function (value) {
          c.props.value[item.prop] = value
        }
  
        if (~Object.keys(form).indexOf(item.tag)) {
          let tag = form[item.tag].tag
          let bind = merge(item.bind, {
            style: {
              width: '100%'
            },
            props: {
              value: value
            },
            on: {
              input: input
            }
          },
          form[item.tag].bind)
          if (rule && rule.max && ~['text', 'textarea'].indexOf(item.tag)) {
            return [h(tag, bind, ''), h('span', {class: 'max-num'}, value.length + '/' + rule.max)]
          }
          return [h(tag, bind, ''), prompt]
        }
        if (item.tag === 'tree') {
          let bind = merge(item.bind, {
            props: {
              showCheckbox: true,
              defaultExpandAll: true,
              expandOnClickNode: false
            },
            on: {
              'check-change': function (data) {
                let index = value.indexOf(data.value)
                if (~index) {
                  c.props.value[item.prop].splice(index, 1)
                } else {
                  c.props.value[item.prop].push(data.value)
                }
              }
            }
          })
          return [h('el-tree', bind, ''), prompt]
        }
        if (item.tag === 'select') {
          let children = []
          let opts = item.options
          for (let i = 0; i < opts.length; i++) {
            let opt = opts[i]
            opt.key = i
            children.push(h('el-option', {
              props: opt
            }, opt.label))
          }
          return [h('el-select',
              merge(item.bind, {
                style: {
                  width: '100%'
                },
                props: {
                  value: value
                },
                on: {
                  input: input
                }
              }), children), prompt]
        }
        if (item.tag === 'radio' || item.tag === 'checkbox') {
          let children = []
          let opts = item.options
          for (let i = 0; i < opts.length; i++) {
            let opt = opts[i]
            opt.key = i
            children.push(h(`el-${item.tag}`, {
              props: Object.assign({}, opt, {
                label: opt.value
              })
            }, opt.label), prompt)
          }
          return [h(`el-${item.tag}-group`,
              merge(item.bind, {
                props: {
                  value: value
                },
                on: {
                  input: input
                }
              }), children), prompt]
        }
        if (item.tag === 'upload') {
          let tag = 'el-upload'
          let bind = merge(item.bind, {
            class: {
              'uploadHide': value.length >= item.maxNumb
            },
            props: {
              fileList: value,
              beforeUpload: function (file) {
                if (file.size / 1024 > item.maxSize) {
                  this.$message.error(`上传图片大小不能超过 ${item.maxSize}KB!`)
                  return false
                }
                if (!~item.bind.props.accept.indexOf(file.type)) {
                  this.$message.error(item.prompt)
                  return false
                }
              },
              onChange: function (f, l) {
                value = input(l)
              },
              onRemove: function (f, l) {
                value = input(l)
              }
            }
          })
          return [h(tag, bind, [h('i', {
            class: ['el-icon-plus']
          }, '')]), prompt]
        }
      }
    }
  }
  function merge () {
    var one = arguments[0]
    for (let i = 1; i < arguments.length; i++) {
      one = mer(one, arguments[i])
    }
    return one
    function mer (obj1, obj2) {
      let obj = Object.assign({}, obj2)
      for (let key in obj1) {
        if (typeof obj[key] === 'object') {
          if (obj[key] instanceof Array) {
            obj[key] = [].concat(obj1[key], obj[key])
          } else {
            obj[key] = Object.assign({}, obj1[key], obj[key])
          }
        }
      }
      return Object.assign({}, obj1, obj)
    }
  }
</script>
