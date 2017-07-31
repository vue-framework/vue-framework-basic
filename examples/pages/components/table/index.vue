<template> 
  <div class="page">
    <bas-table :filters="filters" @search="search" :page="page" :data="data" :cols="cols" :btns='btns'></bas-table>
  </div> 
</template>
<script>
 export default {
   data () {
     return {
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
           label: '企业名称',
           prop: 'customerName'
         },
         {
           label: '地址',
           fuc (row, h) {
             if (row.status === 0) {
               return {
                 type: 'text',
                 value: '我的地址' + row.address
               }
             }
           }
         },
         {
           label: '状态',
           fuc (row, h) {
             if (row.status === 0) {
               return {
                 type: 'text',
                 value: '我的地址' + row.address
               }
             }
           }
         },
         {
           label: '标签',
           handler (row, h) {
             if (row.status === 0) {
               return {
                 type: 'tag',
                 name: 'success',
                 value: '标签'
               }
             }
           }
         }
       ],
       data: table.data,
       index: true,
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
     search (filters) {
       console.log(filters)
     }
   }
 }

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
       'customerName': '企业客户来了10',
       'gmtCreate': '2017-07-21T13:36:48+08:00',
       'gmtModified': '2017-07-21T13:36:48+08:00',
       'organizeType': 1,
       'phone': '0731-98769087',
       'status': 0
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
       'customerId': 66,
       'customerName': '企业客户来了6',
       'gmtCreate': '2017-07-21T13:36:39+08:00',
       'gmtModified': '2017-07-21T13:36:39+08:00',
       'organizeType': 1,
       'phone': '0731-98769087',
       'status': 0
     },
     {
       'address': '123',
       'area': '湖南/长沙/岳麓区',
       'createUser': 1,
       'customerId': 65,
       'customerName': '企业客户来了5',
       'gmtCreate': '2017-07-21T13:36:37+08:00',
       'gmtModified': '2017-07-21T13:36:37+08:00',
       'organizeType': 1,
       'phone': '0731-98769087',
       'status': 0
     },
     {
       'address': '123',
       'area': '湖南/长沙/岳麓区',
       'createUser': 1,
       'customerId': 64,
       'customerName': '企业客户来了4',
       'gmtCreate': '2017-07-21T13:36:35+08:00',
       'gmtModified': '2017-07-21T13:36:35+08:00',
       'organizeType': 1,
       'phone': '0731-98769087',
       'status': 0
     },
     {
       'address': '123',
       'area': '湖南/长沙/岳麓区',
       'createUser': 1,
       'customerId': 63,
       'customerName': '企业客户来了3',
       'gmtCreate': '2017-07-21T13:36:33+08:00',
       'gmtModified': '2017-07-21T13:36:33+08:00',
       'organizeType': 1,
       'phone': '0731-98769087',
       'status': 0
     },
     {
       'address': '123',
       'area': '湖南/长沙/岳麓区',
       'createUser': 1,
       'customerId': 62,
       'customerName': '企业客户来了2',
       'gmtCreate': '2017-07-21T13:36:30+08:00',
       'gmtModified': '2017-07-21T13:36:30+08:00',
       'organizeType': 1,
       'phone': '0731-98769087',
       'status': 0
     }
   ]
}
</script>
