<style>

</style>
<template> 
  <div class="page"> 
    <bas-edit-table :data="data" :cols="cols" ref="edit"></bas-edit-table>
    <el-button  @click="submit">保存</el-button>
  </div> 
</template>
<script>
export default {
  data () {
    return {
      cols: [
        {
          label: '员工姓名',
          rule: {
            type: 'email',
            require: true,
            max: 10,
            min: 2,
            msg: '请输入员工'
          },
          type: 'text',
          prop: 'text'
        },
        {
          label: '选择',
          type: 'select',
          prop: 'select',
          options: [
            {
              label: '选择一',
              value: 1
            },
            {
              label: '选择二',
              value: 2
            }
          ]
        },
        {
          label: 'time',
          type: 'time',
          prop: 'time'
        },
        {
          label: 'date',
          type: 'date',
          prop: 'date'
        },
        {
          label: 'datetime',
          type: 'datetime',
          prop: 'datetime'
        }
      ],
      data: [
        {
          text: '文本1',
          select: 1,
          time: new Date().getTime(),
          date: new Date().getTime(),
          datetime: new Date().getTime()
        },
        {
          text: '文本2',
          select: 2,
          time: new Date().getTime(),
          date: new Date().getTime(),
          datetime: new Date().getTime()
        }
      ]
    }
  },
  methods: {
    submit () {
      console.log(this.data)
      window.alert('验证' + this.$refs.edit.validate())
    }
  }
}
</script>
