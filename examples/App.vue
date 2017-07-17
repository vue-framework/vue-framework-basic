<style lang="less">
  .layout-fixed-fixedauto {
    .layout-left {
      transition: all .5s ;
    }
    .layout-content {
      transition: all .3s ;
    }
  }
</style>
<template>
  <layout-fixed-fixedauto :leftWidth="leftWidth">
    <el-menu slot="top" mode="horizontal">
      <el-menu-item class="f-right" :index="index+''" :key="index" v-for="(val, key, index) in header">
        <router-link :to="key">{{val}}</router-link>
      </el-menu-item>
    </el-menu>
    <bas-left-nav slot="left" v-bind="leftNav" @select-menu="selectNav" @hide-thumbnail="toggleNav">
    </bas-left-nav>
    <router-view slot="right"></router-view>
  </layout-fixed-fixedauto>
</template>
<script>
  export default {
    data () {
      return {
        leftWidth: '200px',
        header: {
          components: '组件',
          dirictives: '指令',
          filters: '过滤器',
          layout: '布局'
        },
        leftNav: {
          href: '/',
          logo: '/static/logo.png',
          location: '竞网智赢',
          menu: require('./pages/router').routes
        }
      }
    },
    methods: {
      selectNav (path, item) {
        this.$router.push(path)
      },
      toggleNav (isHide) {
        this.leftWidth = isHide ? '50px' : '200px'
      }
    },
    created () {
      console.log(require('./pages/router').routes)
      // this.leftNav.logo = this.utils.iconSVG('icon-biaoqing')
      // this.leftNav.toggle = this.utils.iconSVG('icon-fenlei1')
    }
  }
</script>
