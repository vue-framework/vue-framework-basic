<style>
.el-dialog__wrapper{
  position:absolute;
}
.popuser .el-dialog__header{
   background:#E0E0E0;
   padding: 10px;
}
.popuser .wrap .left{
  width:30%;
}
.popuser .wrap .right{
  width:70%;
}

</style>
<template>
<el-dialog
  :modal = 'false'
  :visible.sync="visible"	
  customClass="popuser"
  :title="title"
  size="large">
  <div class="wrap">
    <div class="left">
    </div>
    <div class="right">
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
  export default {
    name: 'BasPopTreeSelect',
    data () {
      return {
        visible: true
      }
    },
    props: ['title'],
    methods: {
      show () {
        this.visible = true
      },
      hide () {
        this.visible = false
      }
    }
  }
</script>
