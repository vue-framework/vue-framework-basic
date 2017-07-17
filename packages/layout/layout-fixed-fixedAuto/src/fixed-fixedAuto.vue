<style lang="less">
.layout-fixed-fixedauto{
    .layout-left{ 
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index:100;
        overflow: hidden;
    }
    .layout-content{
         position: absolute;
         top: 0;
         bottom: 0;
         right: 0;
         z-index:90;
         overflow: hidden;
    }
    .layout-top{
        position: fixed;
        top: 0;
        left:0;
        width: auto;
        right: 0;
        z-index:90;
        overflow: hidden;
    }
    .layout-right{
        position: absolute;
        min-width: 1000px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index:80;
        overflow: hidden;
    }
}
</style>
<script>
export default {
  name: 'layout-fixed-fixedauto',
  functional: true,
  props: {
    leftWidth: {
      default: '200px'
    },
    headerTop: {
      default: '60px'
    },
    clazz: {
      default: ''
    }
  },
  render (createElement, context) {
    return (
      <div class={'layout-fixed-fixedauto' + context.props.clazz}>
        <div class='layout-left' style={'width:' + context.props.leftWidth + ';'}>
          {context.slots().left}
        </div>
        <div class='layout-content' style={'left:' + context.props.leftWidth + ';'}>
          <div class='layout-top' style={'height:' + context.props.headerTop + ';'}>
            {context.slots().top}
          </div>
          <div class='layout-right' style={'top:' + context.props.headerTop + ';'}>
            {context.slots().right}
          </div>
        </div>
      </div>
    )
  }
}
</script>
