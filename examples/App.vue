<style lang="less">
.layout-fixed-auto{
  .layout-right{
    height: 200px;
  }
}
</style>
<template>
    <div>
      <header style="display:none">
          <el-menu mode="horizontal" @select="handleSelect">
                <el-menu-item class="f-right" :key="index" v-for="(val, key, index) in header" index="3"><a href="https://www.ele.me">{{val}}</a></el-menu-item>
          </el-menu>
      </header>
      <router-view></router-view>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        header: {
          components: '组件',
          dirictives: '指令',
          filters: '过滤器',
          layout: '布局'
        }
      }
    },
    methods: {
      handleSelect () {
  
      }
    }
  }
</script>
