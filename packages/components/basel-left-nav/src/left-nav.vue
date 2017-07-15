<template>
  <div class="el-left-nav-wrap">
    <transition name="slide-fade-1">
      <div class="el-left-nav" v-if="!thumbnail">
        <div class="el-left-nav-container">
          <div class="el-left-logo">
            <a :href="href" target="_self" class="el-logo-link">
              <img :src="logo" alt="">
              <i></i>
            </a>
            <span v-html="location"></span>
            <i></i>
          </div>
          <div class="el-left-thumbnail" @click="handleMinCollapse">
            <i class="el-thumbnail-icon"></i>
            <i></i>
          </div>
          <div class="el-left-toolbar">
            <el-collapse accordion v-model="activeName" @change="handleCollapse">
              <el-collapse-item v-for="(item, index) in menu" :index="item.title" :key="index" :name="'name=' + item.title + '&index=' + index">
                <template slot="title">
                  <div v-if="item.hash && !item.submenu.length">
                    <a :href="item.hash" class="el-menu-hash">
                      <i class="el-icon-null" :class="item.styleObject" ></i><span v-html="item.title"></span>
                    </a>
                  </div>
                  <div :class="item.styleObject" v-else>
                    <i class="el-icon-caret-right"></i><span v-html="item.title"></span>
                  </div>
                </template>
                <el-menu @select="doSelectMenu" :default-active="menuActive">
                  <el-menu-item v-for="(prop, num) in item.submenu" :index="'title='+item.title + '/' + prop.title + '&index=' + index + ',' + num" :key="index">
                    <div v-if="prop.hash && !prop.submenu.length">
                      <a :href="prop.hash" class="el-menu-hash"><i :class="prop.iconClass"></i><span v-html="prop.title"></span></a>
                    </div>
                    <div v-else><i :class="prop.iconClass"></i><span v-html="prop.title"></span></div>
                  </el-menu-item>
                </el-menu>
              </el-collapse-item>
            </el-collapse>
            <div class="el-left-bar" :class="{active: showSelectMenu}" v-if="selectMenu.submenu.length">
              <span class="el-arrow-left" @click="hideLeftBar"></span>
              <el-menu @select="doSelectSubMenu" :default-active="subMenuActive">
                <el-menu-item-group :title="selectMenu.title">
                  <el-menu-item v-for="(item, index) in selectMenu.submenu" :index="'title='+item.title + '&index=' + index" :key="index">
                    <a :href="item.hash" v-if="item.hash" class="el-menu-hash"><span v-html="item.title"></span></a>
                    <span v-html="item.title" v-else></span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-menu>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade-2">
      <div class="el-left-nav el-left-nav-min" v-if="thumbnail">
        <div class="el-left-nav-container">
          <div class="el-left-logo">
            <a :href="href" target="_self" class="el-logo-link">
              <img :src="logo" alt="">
              <i></i>
            </a>
            <i></i>
          </div>
          <div class="el-left-thumbnail" @click="handleMinCollapse">
            <i class="el-thumbnail-icon"></i>
            <i></i>
          </div>
          <div class="el-left-toolbar">
            <el-collapse accordion v-model="activeName" @change="handleCollapse">
              <el-collapse-item v-for="(item, index) in menu" :index="item.title" :key="index" :name="'name=' + item.title + '&index=' + index">
                <template slot="title">
                  <div v-if="item.hash && !item.submenu.length">
                    <a :href="item.hash" class="el-menu-hash">
                      <i class="el-icon-caret-right" :class="item.styleObject"></i>
                    </a>
                  </div>
                  <div :class="item.styleObject" v-else>
                    <i class="el-icon-caret-right"></i>
                  </div>    
                </template>
                <el-menu @select="doSelectMenu" :default-active="menuActive">
                  <el-menu-item v-for="(prop, num) in item.submenu" :index="'title='+item.title + '/' + prop.title + '&index=' + index + ',' + num" :key="index">
                    <el-tooltip effect="dark" :content="prop.title" placement="right">
                      <a :href="prop.hash" v-if="prop.hash && !prop.submenu.length" class="el-menu-hash"><i :class="prop.iconClass"></i></a>
                      <i :class="prop.iconClass" v-else></i>
                    </el-tooltip>
                  </el-menu-item>
                </el-menu>
              </el-collapse-item>
            </el-collapse>
            <div class="el-left-bar" :class="{active: showSelectMenu}"  v-if="selectMenu.submenu.length">
              <span class="el-arrow-left" @click="hideLeftBar"></span>
              <el-menu @select="doSelectSubMenu" :default-active="subMenuActive">
                <el-menu-item-group :title="selectMenu.title">
                  <el-menu-item v-for="(item, index) in selectMenu.submenu" :index="'title='+item.title + '&index=' + index" :key="index">
                    <a :href="item.hash" v-if="item.hash" class="el-menu-hash"><span v-html="item.title"></span></a>
                    <span v-html="item.title" v-else></span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-menu>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    created: function () {
      if (!this.utils.componentExists) {
        throw new Error('请先引用 utils 中的 tools 插件')
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
    name: 'BasLeftNav',
    data () {
      return {
        selectMenu: {
          title: '',
          submenu: []
        },
        showSelectMenu: false,
        thumbnail: false,
        rootMenu: '',
        menuActive: '',
        subRootMenu: '',
        subMenuActive: '',
        activeName: '',
        activePath: ''
      }
    },
    props: {
      href: {
        type: String,
        default: '/'
      },
      logo: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: false,
        default: '竞网智赢'
      },
      menu: {
        type: Array,
        required: true
      }
    },
    methods: {
      getQueryString (uri, name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let queryStr = uri
        if (!queryStr) return null
        let r = queryStr.match(reg)
        if (r != null) return unescape(r[2]); return null
      },
      handleCollapse (activeNames) {
        let name = this.getQueryString(activeNames, 'name')
        let index = this.getQueryString(activeNames, 'index')
        this.activeName = activeNames
        this.showSelectMenu = false
        if (this.rootMenu) {
          this.rootMenu.activedIndex = ''
        }
        if (activeNames !== '') {
          this.$emit('change-collapse', {
            title: name,
            index: index
          }, this.showSelectMenu)
        }
      },
      doSelectMenu (index, indexPath, item) {
        let path = this.getQueryString(index, 'index').split('')
        let title = this.getQueryString(index, 'title')
        let mindex = this.getQueryString(index, 'index')
        this.$set(this.selectMenu, 'title', this.menu[path[0]].submenu[path[2]].title)
        this.$set(this.selectMenu, 'submenu', this.menu[path[0]].submenu[path[2]].submenu)
        // 需要判断是否需要展开第三级
        this.showSelectMenu = !!(this.selectMenu.submenu && this.selectMenu.submenu.length)
        this.rootMenu = item.rootMenu
        this.menuActive = index
        if (this.subRootMenu) {
          this.subRootMenu.activedIndex = ''
          this.subMenuActive = ''
        }
        this.$emit('select-menu', {
          title: title,
          index: mindex
        }, this.showSelectMenu)
        this.selectName = title
        this.selectPath = mindex
      },
      doSelectSubMenu (index, indexPath, item) {
        let title = this.getQueryString(index, 'title')
        let mindex = this.getQueryString(index, 'index')
        this.subRootMenu = item.rootMenu
        this.thumbnail = true
        this.subMenuActive = index
        this.$emit('select-sub-menu', {
          title: this.selectName + '/' + title,
          index: this.selectPath + ',' + mindex
        }, this.thumbnail)
      },
      hideLeftBar () {
        this.showSelectMenu = !this.showSelectMenu
        let type = !!this.showSelectMenu
        this.$emit('hide-bar', type)
      },
      handleMinCollapse () {
        this.thumbnail = !this.thumbnail
        let type = !!this.thumbnail
        this.$emit('hide-thumbnail', type)
      }
    }
  }
</script>
<style lang="less">
.el-left-nav-wrap{
  width: 100%;
  height: 100%;
}
.el-left-nav { 
  width: 100%;
  height: 100%;
  color: #fff;
  background: #324057;
  z-index: 50;
}
.el-left-nav .el-left-nav-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324057;
}
.el-left-nav .el-left-logo {
  width: 100%;
  height: 50px;
  background: #1f2d3d;
  text-align: center;
}
.el-left-nav .el-left-logo span {
  display: inline-block;
  color: #fff;
  font-size: 18px;
}
.el-left-nav .el-left-logo i {
  display: inline-block;
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
}
.el-left-nav .el-logo-link {
  float: left;
  width: 50px;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}
.el-left-nav .el-logo-link i,
.el-left-nav .el-logo-link img {
  display: inline-block;
  line-height: 100%;
  vertical-align: middle;
}
.el-left-nav .el-left-thumbnail {
  height: 40px;
  margin: 0 15px;
  background: #324057;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  text-align: center;
}
.el-left-nav .el-left-thumbnail i {
  display: inline-block;
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
}
.el-left-nav .el-left-thumbnail:hover .el-thumbnail-icon {
  background-position: 0 -41px;
}
.el-left-nav .el-left-thumbnail:hover .el-thumbnail-icon.is-active {
  background-position: 0 0;
}
.el-left-nav .el-left-thumbnail .el-thumbnail-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: #fff;
  background: url('./thumbnail.png') no-repeat center center;
  background-position: 0 -63px;
  vertical-align: middle;
}
.el-left-nav .el-left-thumbnail .el-thumbnail-icon.is-active {
  background-position: 0 -20px;
}
.el-left-nav .el-collapse {
  border: none;
}
.el-left-nav .el-collapse .el-icon-caret-right {
  color: #8492a6;
  margin-right: 4px;
  font-size: 10px;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.el-left-nav .el-collapse .el-icon-null{
  display:inline-block;
  width: 15px;
}
.el-left-nav .el-menu {
  color: #fff;
  background: #1f2d3d;
}
.el-left-nav .el-menu .el-menu-item {
  color: #fff;
}
.el-left-nav .el-menu .el-menu-item:hover {
  background: #20a0ff;
}
.el-left-nav .el-menu .el-menu-item:hover i {
  color: #fff;
}
.el-left-nav .el-menu .el-menu-item.is-active {
  background: #20a0ff;
}
.el-left-nav .el-menu .el-menu-item.is-active i {
  color: #fff;
}
.el-left-nav .el-menu .el-menu-item i {
  margin-left: 10px;
  color: #8492a6;
  font-size: 10px;
  line-height: 100%;
}
.el-left-nav .el-menu .el-menu-item .el-icon-share {
  font-size: 18px;
}
.el-left-nav .el-left-bar {
  position: absolute;
  width: 180px;
  height: 100%;
  top: 0;
  left: auto;
  right: 0;
  margin-top: 50px;
  background: #d3dce6;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  opacity: 1;
  z-index: -30;
}
.el-left-nav .el-left-bar.active {
  opacity: 1;
  right: -180px;
}
.el-left-nav .el-left-bar.active .el-arrow-left {
  right: 0;
  background-position: 0 -50px;
}
.el-left-nav .el-left-bar.active .el-arrow-left:hover {
  background-position: 0 -75px;
}
.el-left-nav .el-left-bar .el-menu {
  background: #d3dce6;
}
.el-left-nav .el-left-bar .el-menu-item {
  color: #475669;
  height: 40px;
  padding-top: 0;
  line-height: 40px;
}
.el-left-nav .el-left-bar .el-menu-item:hover {
  color: #20a0ff;
  background: #fff;
}
.el-left-nav .el-left-bar .el-menu-item:hover i {
  color: #fff;
}
.el-left-nav .el-left-bar .el-menu-item.is-active {
  color: #20a0ff;
  background: #fff;
}
.el-left-nav .el-left-bar .el-menu-item.is-active i {
  color: #fff;
}
.el-left-nav .el-left-bar .el-arrow-left {
  position: absolute;
  width: 12px;
  height: 21px;
  top: 10px;
  left: auto;
  right: -12px;
  background: url('./arrows.png') #fff no-repeat center center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-position: 0 0;
  cursor: pointer;
  -webkit-transition: width 0.5s ease-in-out;
  transition: width 0.5s ease-in-out;
  z-index: 1;
}
.el-left-nav .el-left-bar .el-arrow-left:hover {
  width: 14px;
  background-position: 0 -26px;
}
.el-left-nav .el-menu-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-left-nav-min .el-menu-item{
  text-overflow: inherit;
}
.el-left-nav-min {
  width: 50px;
}
.el-left-nav-min .el-left-thumbnail {
  margin: 0 5px;
}
.el-left-nav-min .el-left-thumbnail .el-thumbnail-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: #fff;
  background: url('./thumbnail.png') no-repeat center center;
  background-position: 0 -20px;
  vertical-align: middle;
}
.el-left-nav-min .el-left-thumbnail:hover .el-thumbnail-icon {
  background-position: 0 0;
}
.el-left-nav-min .el-menu .el-menu-item i {
  display: inline-block;
  margin-left: -20px;
  width: 50px;
  height: 40px;
  font-size: 18px;
  vertical-align: middle;
}
.el-left-nav-min .el-menu .el-menu-item i:after {
  content: '';
  display: inline-block;
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
}
.el-left-toolbar {
  width: 100%;
  background: #324057;
}
.el-left-toolbar .el-collapse-item__header {
  height: 40px;
  color: #fff;
  background: #324057;
  padding: 0;
  margin: 0 15px;
  border-color: rgba(255, 255, 255, 0.1);
  font-size: 16px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-left-toolbar .el-collapse-item__header .el-menu-hash{
  display: block;
  width: 100%;
  color: inherit;
  text-decoration: none;
}
.el-left-toolbar .el-collapse-item__header__arrow {
  display: none;
}
.el-left-toolbar .el-collapse-item__content {
  padding: 0;
  background: #1f2d3d;
}
.el-left-toolbar .el-collapse-item__wrap {
  border: none;
}
.el-left-toolbar .el-collapse-item.is-active .el-collapse-item__header {
  border: none;
}
.el-left-toolbar .el-collapse-item.is-active .el-icon-caret-right:before {
  content: "\E604";
}
.el-left-nav-min .el-left-bar .el-menu-item-group__title,
.el-left-bar .el-menu-item-group__title {
  color: #475669;
  height: 40px;
  padding-top: 0;
  background: #c0ccda;
  line-height: 40px;
}
.el-left-nav-min .el-left-toolbar .el-collapse-item__header {
  margin: 0 5px;
  text-align: center;
}
.el-left-nav-min .el-collapse-item .el-menu-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.el-left-nav-min .el-collapse-item .el-menu-item {
  padding: 0;
}
.el-left-nav .el-left-bar .el-menu-hash,
.el-left-nav .el-left-bar .el-menu-hash:hover{
  display: block;
  color: inherit;
  text-decoration: none;
}
.el-left-nav .el-menu .el-menu-hash,
.el-left-nav .el-menu .el-menu-hash:hover{
  display: block;
  color: inherit;
  text-decoration: none;
}
.slide-fade-1-enter-active {
  transition: all .3s ease-in-out .5s;
}
.slide-fade-1-leave-active {
  transition: all .3s ease-in-out;
}
.slide-fade-1-enter, .slide-fade-1-leave-active {
  transform: translateX(-180px);
  opacity: 0;
}
.slide-fade-2-enter-active {
  transition: all .3s ease-in-out .5s;
}
.slide-fade-2-leave-active {
  transition: all .3s ease-in-out;
}
.slide-fade-2-enter, .slide-fade-2-leave-active {
  transform: translateX(-50px);
  opacity: 0;
}
</style>