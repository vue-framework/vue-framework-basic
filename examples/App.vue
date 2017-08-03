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
<style scoped>
.wrap{
  width:100%;
  height:100%;
  overflow: auto;
  box-sizing: border-box;
}
.breadcrumb{
  padding: 10px;
}
</style>
<template>
  <layout-fixed-fixedauto :leftWidth="leftWidth">
    <el-menu slot="top" mode="horizontal">
      <el-menu-item class="f-right" v-for="(val, key, index) in header"  :index="index+''" :key="index" >
        <router-link :to="key">{{val}}</router-link>
      </el-menu-item>
    </el-menu>
    <bas-left-nav slot="left" v-bind="leftNav" @select-menu="selectNav" @hide-thumbnail="toggleNav">
    </bas-left-nav>
    <div slot="right" class="wrap">
      <div class="breadcrumb"> 
          <el-breadcrumb separator="/"> 
                  <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="{ path: item.path }">{{item.meta.name}}</el-breadcrumb-item>
             
          </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
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
      let that = this
      setTimeout(function () {
        console.log(that.$route)
        console.log(that)
      }, 100)
  
      console.log(this.$router)
      // this.leftNav.logo = this.utils.iconSVG('icon-biaoqing')
      // this.leftNav.toggle = this.utils.iconSVG('icon-fenlei1')
    }
  }
</script>
