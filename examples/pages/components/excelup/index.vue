<style>
 
</style>
<template> 
  <el-button @click="up">再来一次</el-button>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
    this.up()
  },
  methods: {
    up () {
      this.$excelup('批量导入员工', 'https://cn.vuejs.org/v2/guide/events.html#事件修饰符',
        {
          action: 'https://jsonplaceholder.typicode.com/posts/',
          data: {

          },
          success (data) {
            console.log(data)
          }
        })
    }
  }

}
</script>
