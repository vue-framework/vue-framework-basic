<template>
<div>
  <div style="width:70%;float:left;">
    <bas-form :data="data" :value="value" :props="props"></bas-form> 
  </div>
</div>
</template>
<script>
 import json from './bas-input-tree-data.js'
 export default {
   data () {
     return {
       props: {
         ref: 'form',
         labelWidth: '120px',
         rules: {
           text: {
             trigger: 'change',
             message: '最多5个字',
             max: 50,
             min: 2,
             required: true
           },
           textarea: {
             max: 40
           },
           select: {
             require: true,
             trigger: 'change',
             validator: function (rule, value, callback) {
               if (value === '选项2') {
                 callback()
               } else {
                 callback(new Error('只能选择双皮奶'))
               }
             }
           }
         }
       },
       data: [
         {
           tag: 'text',
           label: '输入框',
           prop: 'text'
         },
         {
           tag: 'title',
           value: '这里是标题'
         },
         {
           tag: 'textarea',
           label: '文本域',
           prop: 'textarea'
         },
         {
           tag: 'title',
           show: [
             {
               prop: 'radio',
               value: '选项2'
             }
           ],
           value: '选择双皮奶显示'
         },
         {
           tag: 'select',
           show: [
             {
               prop: 'radio',
               value: '选项2'
             }
           ],
           label: '下拉框',
           prop: 'select',
           options: select
         },
         {
           tag: 'select',
           label: '下拉框',
           prop: 'select',
           options: select
         },
         {
           tag: 'cascader',
           label: '级联选择器',
           prop: 'cascader',
           bind: {
             props: {
               options: cascader
             }
           }
         },
         {
           tag: 'number',
           label: '计数器',
           prop: 'number'
         },
         {
           tag: 'address',
           label: '省市区选择',
           prop: 'address'
         },
         {
           tag: 'inputTree',
           label: '下拉树',
           prop: 'inputTree',
           bind: {
             props: {
               label: 'industryName',
               nodeKey: 'industryId',
               parentKey: 'parentId',
               data: json()
             }
           }
         },
         {
           tag: 'radio',
           label: '单选框',
           prop: 'radio',
           options: select
         },
         {
           tag: 'checkbox',
           label: '多选框',
           prop: 'checkbox',
           options: select
         },
         {
           tag: 'rate',
           label: '评分',
           prop: 'rate'
         },
         {
           tag: 'switch',
           label: '开关',
           prop: 'switch'
         },
         {
           tag: 'slider',
           label: '滑块',
           prop: 'slider'
         },
         {
           tag: 'time',
           label: '时间选择器',
           prop: 'time',
           tow: true
         },
         {
           tag: 'date',
           label: '日期选择器',
           prop: 'date',
           tow: true
         },
         {
           tag: 'dateTime',
           label: '日期时间选择器',
           prop: 'datetime'
         },
         {
           tag: 'color',
           label: '颜色选择器',
           prop: 'color'
         },
         {
           tag: 'upload',
           label: '上传',
           maxSize: 2048,
           prop: 'fileList',
           maxNumb: 3,
           prompt: '请上传png,jpg,gif,bmp格式,最多5张,2048kb',
           bind: {
             props: {
               action: 'https://jsonplaceholder.typicode.com/posts/',
               listType: 'picture-card',
               accept: 'image/png,image/jpeg,image/pjpeg,image/pjpeg,image/gif,image/bmp',
               onPreview: function () {
                 window.alert('预览')
               }
             }
           }
         },
         {
           tag: 'transfer',
           label: '穿梭框',
           prop: 'transfer',
           bind: {
             props: {
               data: transfer
             }
           }
         },
         {
           tag: 'tree',
           label: '树',
           prop: 'tree',
           bind: {
             props: {
               data: tree
             }
           }
         },
         {
           tag: 'clause',
           temp: '阅读并接受',
           prop: 'ok',
           a: '《注册协议》',
           href: 'https://github.com/vue-framework/vue-framework-basic'
         },
         {
           tag: 'button',
           left: '150px', // 无就居中
           value: [
             {
               title: '取消',
               type: 'default'
             },
             {
               title: '提交',
               type: 'primary',
               click: function () {
                 window.alert('提交')
               }
             }
           ]
         }
       ],
       value: {
         ok: false,
         tree: [],
         text: '123123',
         textarea: '',
         select: '选项3',
         cascader: ['ziyuan', 'jiaohu'],
         number: 100,
         address: ['湖南', '长沙'],
         inputTree: [283],
         radio: '选项3',
         checkbox: [],
         rate: 3,
         switch: true,
         slider: 100,
         time: new Date(2016, 9, 10, 18, 40),
         date: '',
         datetime: '',
         color: '#20a0ff',
         transfer: [1],
         fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
       }
     }
   },
   watch: {
     value: {
       deep: true,
       handler (n) {
         console.log(n)
       }
     }
   },
   created () {
     console.log(this)
   },
   methods: {
     getDate () {
       console.log(this.$ref.getValue())
     },
     handlePictureCardPreview () {
 
     }
   }
 }
var tree = [{
   label: '一级 1',
   value: '1',
   children: [{
     label: '二级 1-1',
     value: '2',
     children: [{
       label: '三级 1-1-1',
       value: '3'
     }]
   }]
 }, {
   label: '一级 2',
   value: '8',
   children: [{
     label: '二级 2-1',
     value: '4',
     children: [{
       label: '三级 2-1-1',
       value: '5'
     }]
   }, {
     label: '二级 2-2',
     value: '6',
     children: [{
       label: '三级 2-2-1',
       value: '7'
     }]
   }]
 }]
var transfer = [
   {
     label: '上海',
     value: 'shanghai',
     key: 0
   },
   {
     label: '北京',
     value: 'beijing',
     key: 1
   }
]
var select = [{
   value: '选项1',
   label: '黄金糕'
 }, {
   value: '选项2',
   label: '双皮奶'
 }, {
   value: '选项3',
   label: '蚵仔煎'
 }, {
   value: '选项4',
   label: '龙须面'
 }, {
   value: '选项5',
   label: '北京烤鸭'
 }]
var cascader = [{
   value: 'zhinan',
   label: '指南',
   children: [{
     value: 'shejiyuanze',
     label: '设计原则',
     children: [{
       value: 'yizhi',
       label: '一致'
     }, {
       value: 'fankui',
       label: '反馈'
     }, {
       value: 'xiaolv',
       label: '效率'
     }, {
       value: 'kekong',
       label: '可控'
     }]
   }, {
     value: 'daohang',
     label: '导航',
     children: [{
       value: 'cexiangdaohang',
       label: '侧向导航'
     }, {
       value: 'dingbudaohang',
       label: '顶部导航'
     }]
   }]
 }, {
   value: 'zujian',
   label: '组件',
   children: [{
     value: 'basic',
     label: 'Basic',
     children: [{
       value: 'layout',
       label: 'Layout 布局'
     }, {
       value: 'color',
       label: 'Color 色彩'
     }, {
       value: 'typography',
       label: 'Typography 字体'
     }, {
       value: 'icon',
       label: 'Icon 图标'
     }, {
       value: 'button',
       label: 'Button 按钮'
     }]
   }, {
     value: 'form',
     label: 'Form',
     children: [{
       value: 'radio',
       label: 'Radio 单选框'
     }, {
       value: 'checkbox',
       label: 'Checkbox 多选框'
     }, {
       value: 'input',
       label: 'Input 输入框'
     }, {
       value: 'input-number',
       label: 'InputNumber 计数器'
     }, {
       value: 'select',
       label: 'Select 选择器'
     }, {
       value: 'cascader',
       label: 'Cascader 级联选择器'
     }, {
       value: 'switch',
       label: 'Switch 开关'
     }, {
       value: 'slider',
       label: 'Slider 滑块'
     }, {
       value: 'time-picker',
       label: 'TimePicker 时间选择器'
     }, {
       value: 'date-picker',
       label: 'DatePicker 日期选择器'
     }, {
       value: 'datetime-picker',
       label: 'DateTimePicker 日期时间选择器'
     }, {
       value: 'upload',
       label: 'Upload 上传'
     }, {
       value: 'rate',
       label: 'Rate 评分'
     }, {
       value: 'form',
       label: 'Form 表单'
     }]
   }, {
     value: 'data',
     label: 'Data',
     children: [{
       value: 'table',
       label: 'Table 表格'
     }, {
       value: 'tag',
       label: 'Tag 标签'
     }, {
       value: 'progress',
       label: 'Progress 进度条'
     }, {
       value: 'tree',
       label: 'Tree 树形控件'
     }, {
       value: 'pagination',
       label: 'Pagination 分页'
     }, {
       value: 'badge',
       label: 'Badge 标记'
     }]
   }, {
     value: 'notice',
     label: 'Notice',
     children: [{
       value: 'alert',
       label: 'Alert 警告'
     }, {
       value: 'loading',
       label: 'Loading 加载'
     }, {
       value: 'message',
       label: 'Message 消息提示'
     }, {
       value: 'message-box',
       label: 'MessageBox 弹框'
     }, {
       value: 'notification',
       label: 'Notification 通知'
     }]
   }, {
     value: 'navigation',
     label: 'Navigation',
     children: [{
       value: 'menu',
       label: 'NavMenu 导航菜单'
     }, {
       value: 'tabs',
       label: 'Tabs 标签页'
     }, {
       value: 'breadcrumb',
       label: 'Breadcrumb 面包屑'
     }, {
       value: 'dropdown',
       label: 'Dropdown 下拉菜单'
     }, {
       value: 'steps',
       label: 'Steps 步骤条'
     }]
   }, {
     value: 'others',
     label: 'Others',
     children: [{
       value: 'dialog',
       label: 'Dialog 对话框'
     }, {
       value: 'tooltip',
       label: 'Tooltip 文字提示'
     }, {
       value: 'popover',
       label: 'Popover 弹出框'
     }, {
       value: 'card',
       label: 'Card 卡片'
     }, {
       value: 'carousel',
       label: 'Carousel 走马灯'
     }, {
       value: 'collapse',
       label: 'Collapse 折叠面板'
     }]
   }]
 }, {
   value: 'ziyuan',
   label: '资源',
   children: [{
     value: 'axure',
     label: 'Axure Components'
   }, {
     value: 'sketch',
     label: 'Sketch Templates'
   }, {
     value: 'jiaohu',
     label: '组件交互文档'
   }]
 }]
</script>
