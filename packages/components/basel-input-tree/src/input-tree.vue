<style>
.input-tree .input .el-input__icon{
    color: #bfcbd9;
    font-size: 12px;
    top: 50%;
    transition: transform .3s; 
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotateZ(180deg);
    line-height: 16px; 
    cursor: pointer;
}
.input-tree .hideIcon .el-input__icon{  
    transform-origin: center center;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%); 
}
.input-tree .tree{
    position:absolute;
    z-index:1000;
    width:100%;   
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    box-sizing: border-box;
    margin: 5px 0;
    max-height:500px;
    overflow:auto;
}
.input-tree{
    position: relative;
}
.input-tree .el-input .el-input__inner{
    background: #fff;
    color: #1f2d3d;
    cursor: pointer;
    text-overflow: ellipsis;
}
</style>
<style>
.input-tree .input-tree-noParentSelect .el-tree-node__expand-icon + .el-checkbox{
  display:none;
}
.input-tree .input-tree-noParentSelect .el-tree-node__expand-icon.is-leaf + .el-checkbox{
  display:initial;
}
</style>
<template>
    <div class="input-tree"  v-clickoutside="hide"> 
        <div :title="showTitle?showLabel:''">
          <el-input :disabled="true"  :class="['input',visible?'hideIcon':'']" :placeholder="placeholder" icon="caret-top" :value="showLabel" @click.native="toggle"></el-input>
        </div>
        <el-collapse-transition>
            <div class="tree" v-show="visible">
                <el-tree
                :class="[showParentCheckbox?'':'input-tree-noParentSelect']"
                ref="tree"
                :data="treedata"
                :show-checkbox="showCheckbox"
                @node-click ="nodeClick"
                @check-change = "checkChange"
                :props="defaultProps"
                :node-key="nodeKey"
                >
                </el-tree>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script>
    import Clickoutside from 'element-ui/src/utils/clickoutside'
    export default {
      name: 'basInputTree',
      data () {
        return {
          visible: false,
          timeout: null,
          change: true,
          showLabel: ''
        }
      },
      props: {
        data: {},
        placeholder: {},
        value: {
          default: []
        },
        showTitle: {
          default: true
        },
        showParentCheckbox: {
          default: false
        },
        showCheckbox: {},
        nodeKey: {
          default: 'id'
        },
        parentKey: {
          default: 'parentId'
        },
        noParent: {
          default: 0
        },
        label: {
          default: 'label'
        },
        children: {
          default: 'children'
        }
      },
      directives: {
        Clickoutside
      },
      computed: {
        defaultProps () {
          return {
            label: this.label,
            children: this.children
          }
        },
        treedata () {
          let tree = []
          let map = {}
          for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i]
            let key = item[this.nodeKey]
            let pkey = item[this.parentKey]
            let obj = {}
            obj[ this.children ] = []
            map[key] = Object.assign(item, obj, map[key])
            if (pkey === this.noParent) {
              tree.push(item)
            } else {
              item.parent = map[pkey]
              if (map[pkey]) {
                map[pkey][ this.children ].push(item)
              } else {
                let obj = {}
                obj[this.children] = [item]
                map[pkey] = obj
              }
            }
          }
          return tree
        }
      },
      methods: {
        toggle () {
          this.visible = !this.visible
        },
        show () {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.visible = true
          }, 250)
        },
        hide () {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.visible = false
          }, 150)
        },
        nodeClick (value, node, elem) {
          if (!this.showCheckbox && !node.childNodes.length) {
            this.hide()
            this.showLabel = this.addParentName('', value).slice(2)
            this.changevalue([value[this.nodeKey]])
          }
        },
        addParentName (str, obj) {
          str = ' / ' + obj[this.label] + str
          if (obj.parent) {
            return this.addParentName(str, obj.parent)
          }
          return str
        },
        checkChange (value, node, elem) {
          if (this.change) {
            var ids = []
            var nodes = this.$refs.tree.getCheckedNodes()
            for (let i = 0; i < nodes.length; i++) {
              let item = nodes[i]
              if (!item[this.children].length) {
                ids.push(item[this.nodeKey])
              }
            }
            let that = this
            this.change = false
            setTimeout(function () {
              that.change = true
            }, 0)
            this.changevalue(ids)
          }
        },
        changevalue (ids) {
          this.$emit('input', ids)
        },
        setShowLabel () {
          let that = this
          if (!that.data || !that.data.length) {
            setTimeout(function () {
              that.setShowLabel()
            }, 500)
            return false
          }
          if (this.showCheckbox) {
            var arr = []
            for (let i = 0; i < this.data.length; i++) {
              let item = this.data[i]
              let key = item[this.nodeKey]
            // 选中选中key
              if (~this.value.indexOf(key)) {
                if (!this.showCheckbox) {
                  this.$set(arr, 0, item[this.label])
                  break
                } else {
                  arr.push(item[this.label])
                }
              }
            }
            // 设置选中
            this.$refs.tree && this.$refs.tree.setCheckedKeys(this.value)
            this.showLabel = arr.join(';')
          } else {
            for (let i = 0; i < this.data.length; i++) {
              let item = this.data[i]
              if (item[this.nodeKey] === this.value[0]) {
                this.showLabel = this.addParentName('', item).slice(2)
                break
              }
            }
          }
        }
      },
      watch: {
        value (n, o) {
          this.setShowLabel()
        }
      },
      created () {
        this.setShowLabel()
      }
    }
</script>
