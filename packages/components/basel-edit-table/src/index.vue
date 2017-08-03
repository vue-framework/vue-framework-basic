<style>
.edit-table .require:before{
  content:'*';
  color:#ff4949;
  font-size: 12px;
}
.edit-table .error{
  color: #ff4949;
  font-size: 12px;
  position: relative;
  top: -4px;
}
.edit-table .errorBorder input{
  border:1px solid #ff4949;
}
.edit-table.el-table .cell{
  height: 60px;
  padding-top: 8px;
} 
</style>
<script>
let Vue = require('vue')
let getWidth = {
  text: 200,
  select: 200,
  time: 240,
  datetime: 240,
  date: 240
}
export default {
  name: 'BasEditTable',
  props: ['data', 'cols'],
  data () {
    return {
    }
  },
  beforeCreate () {
    Vue.default.config.warnHandler = function (msg, vm, trace) {
      // console.error(msg)
      if (!~msg.indexOf(`type check failed for prop "label"`)) {
        console.error(('[Vue warn]: ' + msg + trace))
      } else {
        console.warn(msg)
      }
    }
  },
  methods: {
    validate () {
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.cols.length; j++) {
          let col = this.cols[j]
          if (this.getError(col.rule, this.data[i][col.prop])) {
            return false
          }
        }
      }
      return true
    },
    getError (rule, value) {
      if (typeof value === 'string') {
        value = value.trim()
      }
      if (!rule) {
        return null
      }
      let err = true
      if (rule.require && !value) {
        return err
      }
      if (rule.max && value.length > rule.max) {
        return err
      }
      if (rule.min && value.length < rule.min) {
        return err
      }
      if (rule.type === 'email' && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
        return err
      }
      if (rule.type === 'number' && !/^\d*$/.test(value)) {
        return err
      }
      if (rule.regExp && !rule.regExp.test(value)) {
        return err
      }
      return null
    }
  },
  render (h) {
    let that = this
    let data = [].concat({
      editTableAdd: true
    }, that.data)
    return getTable()

    function getTable () {
      return h('el-table', {
        class: 'edit-table',
        props: {
          data: data
        }
      }, getTableItem())
    }
    function getTableItem () {
      let column = []
      for (let i = 0; i < that.cols.length; i++) {
        let col = that.cols[i]
        column.push(h('el-table-column', {
          props: {
            width: getWidth[col.type],
            label: h('span', {
              class: {
                require: col.rule && col.rule.require
              }
            }, col.label)
          },
          scopedSlots: {
            default: function (props) {
              if (props.row.editTableAdd) {
                if (col.type !== that.cols[0].type) {
                  return null
                } else {
                  return [h('el-button', {
                    class: {
                      hidden: col.type === 'text'
                    },
                    props: {
                      type: 'primary'
                    },
                    on: {
                      click: function () {
                        let obj = Object.assign({}, that.data[0])
                        for (let key in obj) {
                          obj[key] = null
                        }
                        that.data.push(obj)
                      }
                    }
                  }, '新增')]
                }
              }
              let value = data[props.$index][col.prop]
              let input = function (v) {
                data[props.$index][col.prop] = v
              }
              let error = that.getError(col.rule, value)

              if (error) {
                error = h('span', {
                  class: 'error'
                }, col.rule.msg)
              }
              let model = {
                props: {
                  value: value
                },
                on: {
                  input: input
                },
                class: {
                  errorBorder: error
                }
              }
              let bind = merge(model, col.bind)
              if (col.type === 'text') {
                return [h('el-input', bind), error]
              }
              if (col.type === 'time') {
                return h('el-time-select', bind)
              }
              if (col.type === 'date') {
                return h('el-date-picker', bind)
              }
              if (col.type === 'datetime') {
                return h('el-date-picker', bind)
              }
              if (col.type === 'text') {
                return h('el-input', bind)
              }
              if (col.type === 'select') {
                return h('el-select', bind, getopts(col.options))
              }
            }
          }
        }))
      }
      column.push(getremove())
      return column
    }

    function getremove () {
      return h('el-table-column', {
        props: {
          label: '操作'
        },
        scopedSlots: {
          default: function (props) {
            if (props.row.editTableAdd) {
              return null
            }
            return h('el-button',
              {
                props: {
                  type: 'text'
                },
                on: {
                  click: function () {
                    remove(data, props.row)
                  }
                }
              },
               '删除')
          }
        }
      })
    }
    function getopts (opts) {
      let arr = []
      for (let i = 0; i < opts.length; i++) {
        let it = opts[i]
        arr.push(h('el-option', {
          props: {
            label: it.label,
            value: it.value,
            key: it.value
          }
        }
          ))
      }
      return arr
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

function remove (arr, item) {
  let index = arr.indexOf(item)
  if (~index) {
    arr.splice(index, 1)
  }
}
</script>
