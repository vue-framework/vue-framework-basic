<style>
.bas-table .filter-item{
 width:160px;
}
.bas-table .filter-item+.filter-item,.bas-table .filter button{
  margin-left:12px;
} 
.bas-table .btns{
  margin-top:10px;
}
.bas-table .table{
  margin-top:10px;
}
.bas-table .el-pagination{
  position: absolute;
  right: 26px;
  bottom: 26px;
}
.bas-table{
  margin-bottom: 70px;
}
.bas-table .el-table__body-wrapper{
  overflow-y: hidden;
}
.bas-table .nobtn{
  color:#ccc;
  cursor:not-allowed;
}
.bas-table .confirmbtn{
  margin-left:10px;
}
</style>
<script>
  export default {
    name: 'BasTable',
    data () {
      return {
        currentPage: 1,
        currentSize: 10,
        tabIndex: '0'
      }
    },
    props: {
      filters: {},
      data: {},
      page: {},
      cols: {},
      btns: {},
      tabs: {}
    },
    methods: {
      search () {
        this.$emit('search', {
          filters: this.filters.map(function (item) {
            return {
              key: item.prop,
              value: item.value
            }
          }),
          page: this.currentPage,
          size: this.currentSize,
          tabIndex: this.tabIndex - 0
        })
      }
    },
    render (h) {
      let that = this
      let child = [getTabs(), getFilters(), getButton(), getTable(), getPagination()]
      return <div class='bas-table'>{child}</div>

      function getTabs () {
        if (!that.tabs || !that.tabs.length) {
          return ''
        }
        return h('el-tabs', {
          on: {
            'tab-click': function (v) {
              that.tabIndex = v.name
              that.search()
            }
          }
        }, getTab())
      }
  
      function getTab () {
        let tabs = []
        for (let i = 0; i < that.tabs.length; i++) {
          let tab = that.tabs[i]
          tabs.push(h('el-tab-pane', {
            props: {
              label: tab,
              name: i + ''
            }
          }))
        }
        return tabs
      }
      function getTable () {
        return h('el-table', {
          class: 'table',
          props: {
            data: that.data
          }
        }, getTableItem())
      }
      function getTableItem () {
        let column = []
        for (let i = 0; i < that.cols.length; i++) {
          let col = that.cols[i]
          if (col.type === 'index') {
            column.push(
              h('el-table-column', {
                props: {
                  label: col.label,
                  width: 80,
                  sortable: col.sort
                },
                scopedSlots: {
                  default: function (props) {
                    return h('span', props.$index + 1 + (that.currentPage - 1) * that.currentSize)
                  }
                }
              }))
          } else {
            let obj = {
              label: col.label,
              prop: col.prop,
              width: col.width,
              showOverflowTooltip: true,
              sortable: col.sort
            }
            if (col.filters) {
              obj.filters = col.filters
              obj.filterMethod = function (value, row) {
                return row[col.prop] === value
              }
            }
            column.push(
              h('el-table-column', {
                props: obj,
                scopedSlots: {
                  default: function (props) {
                    let index = props.$index + 1 + (that.currentPage - 1) * that.currentSize
                    let temp = col.fuc && col.fuc(props.row, h, index, props.$index)
                    if (!temp) {
                      temp = {
                        type: 'text',
                        value: props.row[col.prop]
                      }
                    }
                    if (temp.type === 'text') {
                      return h('span', temp.value)
                    }
                    if (temp.type === 'tag') {
                      return h('el-tag', {props: {type: temp.name}}, temp.value)
                    }
                    if (temp.type === 'tag') {
                      return h('el-tag', {props: {type: temp.name}}, temp.value)
                    }
                    if (temp.type === 'btns') {
                      let btns = temp.btns
                      let arr = []
                      for (let i = 0; i < btns.length; i++) {
                        let btn = btns[i]
                        if (btn.no) {
                          arr.push(h('el-tooltip', {
                            class: 'nobtn',
                            props: {
                              effect: 'dark',
                              content: btn.no,
                              placement: 'top'
                            }
                          }, [
                            h('el-button',
                              {
                                props: {
                                  type: 'text'
                                },
                                on: {
                                  click: btn.click || noon
                                }
                              }
                            , btn.label)
                          ]))
                        } else if (btn.confirm) {
                          let child = [
                            <p>{btn.confirm}</p>,
                            <div style='text-align: right; margin: 0'>
                              <el-button size='mini' type='text' onClick={function () { that.$refs['popoverStop' + index].doClose() }}>取消</el-button>
                              <el-button type='primary' size='mini'
                                onClick={function () {
                                  that.$refs['popoverStop' + index].doClose()
                                  btn.click()
                                }}>确定</el-button>
                            </div>,
                            <el-button class='confirmbtn' slot='reference' type='text' >{btn.label}</el-button>]
                          arr.push(h('el-popover', {
                            props: {
                              placement: 'top'
                            },
                            ref: 'popoverStop' + index
                          }, child))
                        } else {
                          arr.push(h('el-button',
                            {
                              props: {
                                type: 'text'
                              },
                              on: {
                                click: btn.click
                              }
                            }
                        , btn.label))
                        }
                      }
                      return arr
                    }
                    return temp
                  }
                }
              }))
          }
        }
        return column
      }
      function getPagination () {
        return h('el-pagination', merge(that.page.bind, {
          props: {
            pageSizes: that.page.pageSizes || [10, 20, 30, 50],
            pageSize: that.page.pageSize || 10,
            total: that.page.total,
            layout: that.page.layout || 'total,sizes,prev,pager,next,jumper'
          },
          on: {
            'size-change': function (size) {
              that.currentSize = size
              that.search()
            },
            'current-change': function (page) {
              that.currentPage = page
              that.search()
            }
          }
        }), '')
      }
      function getButton () {
        let btns = []
        if (that.btns) {
          for (let i = 0; i < that.btns.length; i++) {
            let btn = that.btns[i]
            let bind = merge(btn.bind, {
              props: {
                type: btn.type || 'primary',
                icon: btn.icon || ''
              },
              on: {
                click: btn.click || noon
              }
            })
            btns.push(h('el-button', bind, btn.label || ''))
          }
        }
        if (btns.length) {
          return <div class='btns'>{btns}</div>
        } else {
          return ''
        }
      }
      function getFilters () {
        if (!that.filters) {
          return ''
        }
        let filters = []
        for (let i = 0; i < that.filters.length; i++) {
          filters.push(filterItem(that.filters[i]))
        }
        filters.push(h('el-button', {
          props: {
            type: 'primary'
          },
          on: {
            click: function () {
              that.search()
            }
          }
        }, '查询'))
        filters.push(h('el-button', {
          on: {
            click: function () {
              for (let i = 0; i < that.filters.length; i++) {
                let it = that.filters[i]
                if (it.type === 'text') {
                  that.$set(it, 'value', '')
                }
              }
            }
          }
        }, '清空'))
        return <div class='filter'>{filters}</div>
      }
      function filterItem (filter) {
        let type = filter.type
        let options = filter.options
        let value = filter.value
        let input = function (v) {
          that.$set(filter, 'value', v)
        }
        let model = merge({
          on: {
            input: input
          },
          props: {
            value: value
          },
          class: ['filter-item']
        }, filter.bind)

        if (type === 'text') {
          return h('el-input', model, '')
        }
  
        if (type === 'select') {
          let opts = []
          for (let i = 0; i < options.length; i++) {
            let it = options[i]
            opts.push(h('el-option', {
              props: {
                label: it.label,
                value: it.value
              }
            }))
          }
          return h('el-select', model, opts)
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
function noon () {}
</script>
