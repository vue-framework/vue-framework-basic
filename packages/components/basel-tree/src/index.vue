<style>
  .bas-tree {
    height: 100%;
    border: 1px solid #99a9bf;
    min-height:660px;
  }
  .bas-tree .title {
    height: 40px;
    line-height: 40px;
    background: #e5e9f2;
    padding-left: 15px;
    font-size: 14px;
  }
  .bas-tree .noData{
    text-align: center;
    margin-top: 20px;
  }
  .bas-tree .el-button+.el-button{
        margin-left: 4px;
  }
  .bas-tree .tree-item:after{
    content:'';
    display:block;
    clear:both;
  }
  .bas-tree .el-tree-node__content{
    height: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  .bas-tree .ellipsis{
    display:block;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
  }
  .bas-tree .el-icon-check{
    position: absolute;
    right: 0;
    top: 4px;
    font-size: 12px;
    padding: 8px;
    color: #20a0ff;
    background: #fff;
    display: inline-block;
    height: 14px;
  }
  .bas-tree .add-input{
    display:block;
  }
  .bas-tree .search{
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
  }
  .bas-tree .search .el-icon-search{
    right: 16px;
  }
   .bas-tree .name{
    height: 36px;
    line-height: 36px;
    background: #e5e9f2;
    padding-left: 15px;
    font-size: 12px;
   }
   .bas-tree .name .el-icon-plus{
     float:right;
    margin: 11px 16px 0 0;
    color: #8990A2;
    cursor: pointer;
   }
</style>
<template>
  <div class="bas-tree">
    <div class="title">{{title}}</div>
    <el-input class="search" placeholder="输入关键字进行过滤" v-model="filterText" icon="search">
    </el-input>
    <div class="name" @click="treeClick()">{{name}}<i class="el-icon-plus" @click.stop="showGround" title="点击“+”按钮 即可添加分组"></i></div>
    <div>
      <el-input
          v-show="show ==='addnew'"
          placeholder=""
          icon="check"
          v-model="addValue"
          :on-icon-click="append">
      </el-input>
    </div>
    <el-tree class="tree" :node-key="props.nodeKey" @node-click="treeClick" :expand-on-click-node="true" :render-content="renderContent" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree">
    </el-tree>
    <div class="noData" v-if="noData">暂无数据</div>
  </div>
</template>
<script>
  export default {
    name: 'BasTree',
    data () {
      return {
        filterText: '',
        noData: false,
        show: false,
        value: '',
        addValue: ''
      }
    },
    watch: {
      filterText (val) {
        this.noData = true
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      showGround () {
        this.addValue = ''
        this.show = 'addnew'
      },
      treeClick (data, node, item) {
        this.$emit('node-click', data, node, item)
      },
      filterNode (value, data) {
        if (!value) {
          this.noData = false
          return true
        }
        let is = data[this.defaultProps.label].indexOf(value) !== -1
        if (is) {
          this.noData = false
        }
        return is
      },
      itRemove (store, data) {
        this.remove(data).then(
          function () {
            store.remove(data)
          }, this.err
        )
      },
      addInput (store, data) {
        this.addValue = ''
        this.show = 'add' + data.$treeNodeId
      },
      err (err) {
        this.$message({
          message: err.message,
          type: 'warning'
        })
      },
      append (store, data) {
        if (!this.addValue) return false
        let that = this
        let child = this.defaultProps.children
        let parentKey = this.props.parentKey
        let nodeKey = this.props.nodeKey
        let obj = {}
        obj[this.props.label] = this.addValue
        obj[child] = []
        if (data) {
          obj[parentKey] = data[nodeKey]
        } else {
          console.log(store, data)
          obj[parentKey] = that.noParent
        }
        this.add(obj).then(function (id) {
          obj[nodeKey] = id
          if (data) {
            store.append(obj, data)
          } else {
            that.data.push(obj)
          }
          that.addValue = ''
          that.show = false
        }, this.err)
      },
      itEdit (store, data) {
        if (!this.value) return false
        let that = this
        this.edit(data, this.value).then(function () {
          data[that.props.label] = that.value
          that.show = false
        }, this.err)
      },
      renderContent (h, { node, data, store }) {
        let arr = [
          <el-tooltip class='item' effect='dark' content={node.label} placement='top' v-show={this.show !== data.$treeNodeId}>
            <span>{node.label}</span>
          </el-tooltip>,
          <el-input
            class='edit-input'
            value={this.value}
            ref={'input' + data.$treeNodeId}
            on-click={(e) => { e.stopPropagation() }}
            on-input={(v) => { this.value = v }} v-show={this.show === data.$treeNodeId} />,
          <i class='el-icon-check' v-show={this.show === data.$treeNodeId} on-click={(e) => { this.itEdit(store, data, e); e.stopPropagation() }} />,
          <span style='float: right; margin-right: 4px'>
            <el-tooltip v-show={!data.bind || !data.bind.noEdit} class='item' effect='dark' content='添加' placement='top'>
              <el-button size='mini' on-click={(e) => { this.addInput(store, data); e.stopPropagation() }}><i class='el-icon-plus' /></el-button>
            </el-tooltip>
            <el-tooltip v-show={!data.bind || !data.bind.noEdit} class='item' effect='dark' content='编辑' placement='top'>
              <el-button size='mini' on-click={(e) => { this.value = data[this.props.label]; this.show = data.$treeNodeId; e.stopPropagation() }}><i class='el-icon-edit' /></el-button>
            </el-tooltip>
            <el-tooltip v-show={!data.bind || !data.bind.noEdit} class='item' effect='dark' content='删除' placement='top'>
              <el-button size='mini' on-click={(e) => { this.itRemove(store, data); e.stopPropagation() }}><i class='el-icon-delete' /></el-button>
            </el-tooltip>
          </span>
        ]
        arr.push(
            h('el-input', {
              class: 'add-input',
              props: {
                placeholder: '请输入添加值',
                value: this.addValue,
                icon: 'check',
                onIconClick: () => {
                  this.append(store, data)
                }
              },
              on: {
                input: (v) => {
                  this.addValue = v
                },
                click: (e) => {
                  e.stopPropagation()
                }
              },
              directives: [
                {
                  name: 'show',
                  value: this.show === 'add' + data.$treeNodeId
                }
              ]
            }))
        return (
          <span class='tree-item'>
            {arr}
          </span>)
      }
    },
    computed: {
      defaultProps () {
        return {
          label: this.props.label,
          children: this.props.children || 'children'
        }
      },
      treeData () {
        console.log('update')
        let data = JSON.parse(JSON.stringify(this.data))
        let tree = []
        let map = {}
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let key = item[this.props.nodeKey]
          let pkey = item[this.props.parentKey]
          let obj = {}
          obj[ this.defaultProps.children ] = []
          map[key] = Object.assign(item, obj, map[key])
          if (pkey === this.noParent) {
            tree.push(item)
          } else {
            item.parent = map[pkey]
            if (map[pkey]) {
              map[pkey][ this.defaultProps.children ].push(item)
            } else {
              let obj = {}
              obj[this.defaultProps.children] = [item]
              map[pkey] = obj
            }
          }
        }
        return tree
      }
    },
    props: {
      noParent: {
        default: 0
      },
      remove: {
        type: Function
      },
      add: {
        type: Function
      },
      edit: {
        type: Function
      },
      name: {},
      title: {},
      data: {},
      props: {
        default: {
          nodeKey: 'id',
          parentKey: 'pid',
          label: 'label'
        }
      }
    }
  }
</script>
