<style>
.left{
    vertical-align: top;
    width: 30%;
    display: inline-block;
    float: left;
}
.right{
  width: 68%;
  display: inline-block;
  margin-left: 16px;
}
</style>
<template> 
  <div class="page"> 
    <div class="left">
    <bas-tree @node-click="treeClick"  :data="tree" :props="props" title="公司部门" :remove="remove" :add="add" :edit="edit"></bas-tree>
    </div>
    <div class="right">
    <bas-table :tabs="tabs" :filters="filters" @search="search" :page="page" :data="data" :cols="cols" :btns='btns'></bas-table>
    </div>
  </div> 
</template>
<script>
  let index = 1000
export default {
    data () {
      return {
        tree: tree,
        props: {
          nodeKey: 'depId',
          parentKey: 'parentId',
          label: 'departName'
        },
        tabs: ['待处理', '已处理'],
        btns: [
          {
            label: '新增',
            click: () => {
              console.log(this)
            },
            icon: 'plus'
          },
          {
            label: '导出',
            type: 'default',
            click: () => {
              console.log(this)
            }
          }
        ],
        cols: [
          {
            type: 'index',
            label: '序号'
          },
          {
            label: '企业名称',
            sort: true,
            prop: 'customerName'
          },
          {
            label: '地址',
            fuc (row, h) {
              return {
                type: 'text',
                value: '我的地址' + row.address
              }
            }
          },
          {
            label: '状态',
            width: 100,
            prop: 'status',
            filters: [{ text: '状态0', value: 0 }, { text: '状态1', value: 1 }],
            fuc (row, h) {
              if (row.status === 0) {
                return {
                  type: 'text',
                  value: '状态0'
                }
              }
              return {
                type: 'text',
                value: '状态1'
              }
            }
          },
          {
            label: '标签',
            fuc (row, h) {
              return {
                type: 'tag',
                name: 'success',
                value: '标签'
              }
            }
          },
          {
            label: '自定义',
            fuc (row, h) {
              return h('span', '自定义')
            }
          },
          {
            label: '操作',
            fuc (row, h, index, i) {
              let btns = [
                {
                  label: '编辑',
                  click: () => { window.alert('编辑'); console.log(this) }
                },
                {
                  label: '删除',
                  no: '无法操作',
                  click: function () {}
                }
              ]
              if (row.status) {
                btns.push(
                  {
                    label: '停用',
                    confirm: '你确定要停用第' + index + '条账号?',
                    click: function () {
                      window.alert('停用')
                    }
                  })
              }
              return {
                type: 'btns',
                btns: btns
              }
            }
          }
        ],
        data: table.data,
        filters: [
          {
            type: 'text',
            prop: 'text',
            value: '输入值'
          },
          {
            type: 'select',
            prop: 'select',
            value: '1',
            options: [
              {label: '选择一',
                value: '1'},
              {label: '选择二',
                value: '2'},
              {label: '选择三',
                value: '3'}
            ]
          }
        ],
        page: {
          total: 100
        }
      }
    },
    methods: {
      add (data) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            console.log(data)
            resolve(index++)
          }, 100)
        })
      },
      remove () {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error('删除失败'))
          }, 1000)
        })
      },
      edit () {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      },
      treeClick (data, node, item) {
        console.log(data, node, item)
      },
      search (filters) {
        console.log('搜索')
        console.log(filters)
      }
    }
}

let tree = [
    {
      'depId': 0,
      'partnerId': 58,
      'parentId': 0,
      'departName': '未分配部门',
      'status': 1
    },
    {
      'gmtModified': '2017-07-06T10:31:32+08:00',
      'departNo': 'vdzh',
      'depId': 3,
      'partnerId': 58,
      'gmtCreate': '2017-07-06T10:31:32+08:00',
      'parentId': 0,
      'departName': '部门1499308362',
      'status': 1
    },
    {
      'gmtModified': '2017-07-06T10:33:20+08:00',
      'depId': 4,
      'partnerId': 58,
      'gmtCreate': '2017-07-06T10:33:20+08:00',
      'parentId': 3,
      'departName': '好的',
      'status': 1
    },
    {
      'gmtModified': '2017-07-06T10:34:04+08:00',
      'depId': 5,
      'partnerId': 58,
      'gmtCreate': '2017-07-06T10:34:04+08:00',
      'parentId': 4,
      'departName': '不好的',
      'status': 1
    },
    {
      'gmtModified': '2017-07-06T15:39:17+08:00',
      'depId': 7,
      'partnerId': 58,
      'gmtCreate': '2017-07-06T15:39:17+08:00',
      'parentId': 3,
      'departName': '哈哈',
      'status': 1
    },
    {
      'gmtModified': '2017-07-21T15:44:35+08:00',
      'depId': 70,
      'partnerId': 58,
      'gmtCreate': '2017-07-10T08:35:39+08:00',
      'parentId': 0,
      'departName': 'mingcheng饿',
      'status': 1
    },
    {
      'gmtModified': '2017-07-10T08:35:51+08:00',
      'depId': 71,
      'partnerId': 58,
      'gmtCreate': '2017-07-10T08:35:51+08:00',
      'parentId': 70,
      'departName': '什么问题',
      'status': 1
    },
    {
      'gmtModified': '2017-07-10T08:35:59+08:00',
      'depId': 72,
      'partnerId': 58,
      'gmtCreate': '2017-07-10T08:35:59+08:00',
      'parentId': 70,
      'departName': 'haode',
      'status': 1
    },
    {
      'gmtModified': '2017-07-19T08:43:41+08:00',
      'depId': 347,
      'partnerId': 58,
      'gmtCreate': '2017-07-19T08:43:41+08:00',
      'parentId': 72,
      'departName': '345',
      'status': 1
    },
    {
      'gmtModified': '2017-08-01T16:19:15+08:00',
      'depId': 563,
      'partnerId': 58,
      'gmtCreate': '2017-08-01T16:19:15+08:00',
      'parentId': 347,
      'departName': '123123',
      'status': 1
    },
    {
      'gmtModified': '2017-08-01T16:19:19+08:00',
      'depId': 564,
      'partnerId': 58,
      'gmtCreate': '2017-08-01T16:19:19+08:00',
      'parentId': 563,
      'departName': '123123123',
      'status': 1
    },
    {
      'gmtModified': '2017-08-01T16:19:22+08:00',
      'depId': 565,
      'partnerId': 58,
      'gmtCreate': '2017-08-01T16:19:22+08:00',
      'parentId': 564,
      'departName': '1231231311111111111111111111',
      'status': 1
    },
    {
      'gmtModified': '2017-08-01T16:19:24+08:00',
      'depId': 566,
      'partnerId': 58,
      'gmtCreate': '2017-08-01T16:19:24+08:00',
      'parentId': 565,
      'departName': '12312312312311111111111111111',
      'status': 1
    },
    {
      'gmtModified': '2017-08-01T16:19:34+08:00',
      'depId': 567,
      'partnerId': 58,
      'gmtCreate': '2017-08-01T16:19:34+08:00',
      'parentId': 566,
      'departName': '123123123131111111111111111',
      'status': 1
    }
]

let table = {
    'data': [
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 71,
        'customerName': '企业客户来了11',
        'gmtCreate': '2017-07-21T13:36:52+08:00',
        'gmtModified': '2017-07-21T13:36:52+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 0
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 70,
        'customerName': '企业客户来了10企业客户来了10企业客户来了10企业客户来了10',
        'gmtCreate': '2017-07-21T13:36:48+08:00',
        'gmtModified': '2017-07-21T13:36:48+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 1
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 69,
        'customerName': '企业客户来了9',
        'gmtCreate': '2017-07-21T13:36:46+08:00',
        'gmtModified': '2017-07-21T13:36:46+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 1
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 68,
        'customerName': '企业客户来了8',
        'gmtCreate': '2017-07-21T13:36:44+08:00',
        'gmtModified': '2017-07-21T13:36:44+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 1
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 67,
        'customerName': '企业客户来了7',
        'gmtCreate': '2017-07-21T13:36:42+08:00',
        'gmtModified': '2017-07-21T13:36:42+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 1
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 67,
        'customerName': '企业客户来了7',
        'gmtCreate': '2017-07-21T13:36:42+08:00',
        'gmtModified': '2017-07-21T13:36:42+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 0
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 68,
        'customerName': '企业客户来了8',
        'gmtCreate': '2017-07-21T13:36:44+08:00',
        'gmtModified': '2017-07-21T13:36:44+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 0
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 67,
        'customerName': '企业客户来了7',
        'gmtCreate': '2017-07-21T13:36:42+08:00',
        'gmtModified': '2017-07-21T13:36:42+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 0
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 68,
        'customerName': '企业客户来了8',
        'gmtCreate': '2017-07-21T13:36:44+08:00',
        'gmtModified': '2017-07-21T13:36:44+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 0
      },
      {
        'address': '123',
        'area': '湖南/长沙/岳麓区',
        'createUser': 1,
        'customerId': 67,
        'customerName': '企业客户来了7',
        'gmtCreate': '2017-07-21T13:36:42+08:00',
        'gmtModified': '2017-07-21T13:36:42+08:00',
        'organizeType': 1,
        'phone': '0731-98769087',
        'status': 0
      }
    ]
}
</script>
