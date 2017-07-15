<style lang="less">
  .layout-fixed-fixedauto {
    .layout-left {
      background: #EEF1F6;
    }
  }
</style>
<template>
  <layout-fixed-fixedauto>
    <el-menu slot="top" mode="horizontal" @select="handleSelect">
      <el-menu-item class="f-right" :index="index+''" :key="index" v-for="(val, key, index) in header">
        <router-link :to="key">{{val}}</router-link>
      </el-menu-item>
    </el-menu>
    <bas-left-nav slot="left" v-bind="leftNav">
    </bas-left-nav>
    <router-view slot="right"></router-view>
  </layout-fixed-fixedauto>
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
        },
        leftNav: {
          logo: '',
          toggle: '',
          title: '使用案列',
          data: require('./pages/router').routes
        }
      }
    },
    created () {
      this.leftNav.logo = this.utils.Icon('icon-biaoqing')
      this.leftNav.toggle = this.utils.Icon('icon-fenlei1')
    },
    methods: {
      handleSelect () {}
    }
  }
</script>
