<style lang="less">
.layout-fixed-auto{
    .layout-left{ 
        float: left; 
    }
}
</style>
<script>
export default {
  name: 'layout-fixed-auto',
  functional: true,
  props: {
    leftWidth: {
      default: '200px'
    }
  },
  render (createElement, context) {
    return (
      <div class='layout-fixed-auto'>
        <div class='layout-left' style={'width:' + context.props.leftWidth + ';'}>
          {context.slots().left}
        </div>
        <div class='layout-right' style={'margin-left:' + context.props.leftWidth + ';'}>
          {context.slots().right}
        </div>
      </div>
    )
  }
}
</script>