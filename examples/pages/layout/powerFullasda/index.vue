<style lnag="less">
  .test {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row
  }
  .item1 {
    width: 200px;
  }
  .item2 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .item3 {
    flex-grow: 1;
  }
  .top {
    height: 80px;
  }
  .right {
    flex-grow: 1;
  }
</style>
<template>
  <div>
    <div style="height:300px;float:left;">
      <layout-powerfull :data="flex">
        <div slot="left">left</div>
        <div slot="right">right</div>
        <div slot="center">center</div>
        <div slot="ct">ct</div>
        <div slot="cb">cb</div>
      </layout-powerfull>
    </div>
    <el-input spellcheck="false" style="float:left;width:400px;margin-left:20px" type="textarea" :rows="14" placeholder="请输入内容" :value="JSON.stringify(flex,null,2)" @input="inputVal">
    </el-input>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        flex: {
          height: '100%',
          width: '400px',
          type: 'row',
          bind: {
            style: {
              background: 'rgba(204, 204, 204,0.8)'
            },
            attrs: {dataValue: 1}
          },
          child: [{
            width: '100px',
            component: 'left'
          },
          {
            type: 'column',
            grow: 1,
            child: [{
              height: '80px',
              component: 'ct'
            },
            {
              grow: 1,
              component: 'cb'
            }
            ]
          },
          {
            grow: 1,
            component: 'right'
          }
          ]
        }
      }
    },
    methods: {
      inputVal (value) {
        this.flex = JSON.parse(value)
      }
    }
  }
</script>
