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
          href: '/',
          logo: '../../dist/theme/images/logo.png',
          location: '竞网智赢',
          menu: [{
            'title': '信息',
            'hash': '#/info',
            'submenu': [{
              'title': '信息首页',
              'iconClass': {
                'el-icon-share': true
              },
              'permission': [{
                'name': '查看权限',
                'key': 'App.info.userInfo.view',
                'value': ['/us/v1/checkView.do']
              }, {
                'name': '编辑权限',
                'key': 'App.info.userInfo.edit',
                'value': ['/us/v1/editView.do']
              }],
              'submenu': [],
              'hash': '#/info/userInfo'
            }]
          }, {
            'title': '测试',
            'hash': '#/test',
            'submenu': [{
              'title': '测试首页',
              'iconClass': {
                'el-icon-share': true
              },
              'permission': [{
                'name': '查看权限',
                'key': 'App.test.test.view',
                'value': ['/us/v1/checkView.do']
              }, {
                'name': '编辑权限',
                'key': 'App.test.test.edit',
                'value': ['/us/v1/editView.do']
              }],
              'submenu': [],
              'hash': '#/test/test'
            }, {
              'title': '测试index',
              'iconClass': {
                'el-icon-share': true
              },
              'permission': [{
                'name': '查看权限',
                'key': 'App.test.index.view',
                'value': ['/us/v1/checkView.do']
              }, {
                'name': '编辑权限',
                'key': 'App.test.index.edit',
                'value': ['/us/v1/editView.do']
              }],
              'submenu': [],
              'hash': '#/test/'
            }]
          }, {
            'title': '测试单文件',
            'hash': '#/test',
            'submenu': []
          }, {
            'title': '用户',
            'hash': '#/user',
            'submenu': [{
              'title': '用户首页',
              'iconClass': {
                'el-icon-share': true
              },
              'submenu': [],
              'hash': '#/user/user'
            }, {
              'title': '用户列表',
              'iconClass': {
                'el-icon-share': true
              },
              'submenu': [{
                'title': '用户列表首页',
                'permission': [{
                  'name': '查看权限',
                  'key': 'App.user.userList.view',
                  'value': ['/us/v1/checkView.do']
                }, {
                  'name': '编辑权限',
                  'key': 'App.user.userList.edit',
                  'value': ['/us/v1/editView.do']
                }],
                'submenu': [],
                'hash': '#/user/userList/userList'
              }, {
                'title': '用户列表详情',
                'permission': [{
                  'name': '查看权限',
                  'key': 'App.user.userInfo.view',
                  'value': ['/us/v1/checkView.do']
                }, {
                  'name': '编辑权限',
                  'key': 'App.user.userInfo.edit',
                  'value': ['/us/v1/editView.do']
                }],
                'submenu': [],
                'hash': '#/user/userList/userInfo'
              }],
              'hash': '#/user/userList'
            }, {
              'title': '用户部门',
              'iconClass': {
                'el-icon-share': true
              },
              'submenu': [{
                'title': '用户部门首页',
                'permission': [{
                  'name': '查看权限',
                  'key': 'App.user.userEmp.view',
                  'value': ['/us/v1/checkView.do']
                }, {
                  'name': '编辑权限',
                  'key': 'App.user.userEmp.edit',
                  'value': ['/us/v1/editView.do']
                }],
                'submenu': [],
                'hash': '#/user/userEmp/userEmp'
              }],
              'hash': '#/user/userEmp'
            }]
          }]
        }
      }
    },
    created () {
      // this.leftNav.logo = this.utils.Icon('icon-biaoqing')
      // this.leftNav.toggle = this.utils.Icon('icon-fenlei1')
    },
    methods: {
      handleSelect () {}
    }
  }
</script>
