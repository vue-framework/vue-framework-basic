<style scoped lang="less">
  .header {
    text-align: center;
    .logo {
      float: left;
      width: 50px;
      height: 100%;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 40px;
      .img {
        width: 30px;
        height: 30px;
      }
    }
    .title {
      display: inline;
      color: #324057;
      font-size: 18px;
    }
  }
  .toggle {
    font-size: 28px;
    text-align: center;
    padding: 4px;
    border-width: 1px 0;
    border-color: #ccc;
    border-style: solid;
    cursor: pointer;
  }
  .el-menu {
    i {
      font-size: 20px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
</style>
<template>
  <div class="left-nav">
    <div class="header" :style="{height:titleHeight+'px'}">
      <a :href="homePage" class="logo" v-html="logo" :style="{lineHeight:titleHeight+'px'}"></a>
      <div class="title" :style="{lineHeight:titleHeight+'px'}">{{title}}</div>
    </div>
    <div class="toggle" v-html="toggle"></div>
    <div>
      <el-menu :default-active="defactive">
        <template v-for="(val, key) in data">
          
          <el-submenu v-if="val.children" :index="key+''">
                <template slot="title">{{val.label}}</template>
               <el-menu-item v-for="(val1, key1) in val.children" :index="'c'+key1"  @click="go(val.path+'/'+val1.path)">
                 <i :class="val.icon" v-html="utils.Icon(val1.colorIcon)"></i>
                 {{val1.label}}
                 </el-menu-item> 
          </el-submenu>
          <el-menu-item v-else :index="key+''" @click="go(val.path)">
             <i :class="val.icon" v-html="utils.Icon(val.colorIcon)"></i>
             {{val.label}}
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    created: function () {
      console.log(this.data)
      if (!this.utils.componentExists) {
        throw new Error('请先引用 utils 中的 tool 工具类')
      }
      if (!this.utils.componentExists(this, 'ElMenu')) {
        throw new Error('请先引用 element-ui 中的 el-menu 组件')
      }
      if (!this.utils.componentExists(this, 'ElSubmenu')) {
        throw new Error('请先引用 element-ui 中的 el-submenu 组件')
      }
      if (!this.utils.componentExists(this, 'ElMenuItem')) {
        throw new Error('请先引用 element-ui 中的 el-menu-item 组件')
      }
      if (!this.utils.componentExists(this, 'ElMenuItemGroup')) {
        throw new Error('请先引用 element-ui 中的 el-menu-group 组件')
      }
      if (!this.utils.componentExists(this, 'ElCollapse')) {
        throw new Error('请先引用 element-ui 中的 el-collapse 组件')
      }
      if (!this.utils.componentExists(this, 'ElCollapseItem')) {
        throw new Error('请先引用 element-ui 中的 el-collapse-item 组件')
      }
    },
    name: 'basLeftNav',
    data () {
      return {}
    },
    props: {
      homePage: {
        type: String,
        default: ''
      },
      logo: {
        type: String,
        default: '',
        required: true
      },
      title: {
        type: String,
        default: 'This is title'
      },
      titleHeight: {
        type: Number,
        default: 60
      },
      toggle: {
        required: true
      },
      defactive: {
        type: String,
        default: 'c0'
      },
      data: {}
    },
    methods: {
      go (path) {
        this.$router.push(path)
      }
    }
  }
</script>
