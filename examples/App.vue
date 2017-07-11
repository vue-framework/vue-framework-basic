<style lang="less">
.layout-fixed-auto{
  .layout-right{
    background: red;
    height: 200px;
  }
}
</style>
<template>
    <div>
      <el-menu mode="horizontal" @select="handleSelect">
            <el-menu-item class="f-right" :key="index" v-for="(val, key, index) in header" index="3"><a href="https://www.ele.me">{{val}}</a></el-menu-item>
      </el-menu>
      <layout-fixed-auto :left-width="layout.leftWidth">
        <el-menu slot="left" mode="vertical" default-active="1" >
            <el-menu-item-group title="分组一">
                <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-message"></i>导航二</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组二">
                <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
                <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
            </el-menu-item-group>
        </el-menu> 
        <div slot="right">

        </div>
      </layout-fixed-auto> 
    </div>
</template>
<script>
  export default {
    data () {
      return {
        layout: {
          leftWidth: '200px'
        },
        header: {
          components: '组件',
          dirictives: '指令',
          filters: '过滤器',
          layout: '布局'
        }
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>