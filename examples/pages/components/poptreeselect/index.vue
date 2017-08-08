<style>

</style>
<template>
  <div>
    <el-button @click="pop">显示弹出窗</el-button>
    <bas-pop-tree-select ref="pop" v-bind="data"></bas-pop-tree-select>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: {
          title: '选择人员'
        }
      }
    },
    methods: {
      pop () {
        this.$refs.pop.show()
      }
    }
  }
</script>
