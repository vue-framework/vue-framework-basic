<style> 
.select-tag{
  border: 1px solid #bfcbd9;
  border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.select-tag .el-tag{
  margin-left:6px;
}
.select-tag .el-button{
  margin-left:6px;
}
</style>
<template>
<div class="select-tag">
    <el-tag
      v-for="tag in value"
      :key="tag.value"
      :closable="true"
      type="primary"
      @close="close(tag)"
    >
    {{tag.label}}
    </el-tag>
    <el-button icon="plus" type="primary" size="mini" @click="add">新增</el-button> 
</div>
</template>
<script>
  export default {
    name: 'BasSelectTag',
    props: ['value'],
    methods: {
      close (tag) {
        this.value.splice(this.value.indexOf(tag), 1)
      },
      add () {
        this.$emit('add')
      }
    }
  }
</script>
