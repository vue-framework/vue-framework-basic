<style lang="less">
.layout-powerfull .layout-item>*{
  width:100%;
  height:100%;
}
</style>
<script>
export default {
  name: 'layout-powerfull',
  functional: true,
  props: {
    data: {
      require: true
    }
  },
  render (h, context) {
    let slots = context.slots()
    let frist = true
    return (
      getFlex(context.props.data)
    )
    function getFlex (data) {
      let bind = Object.assign({}, {style: {}}, data.bind)
      let style = bind.style
      if (data.type) {
        style.flexDirection = data.type
        style.display = 'flex'
      }
      if (data.width) {
        style.width = data.width
      }
      if (data.height) {
        style.height = data.height
      }
      if (data.grow) {
        style.flexGrow = data.grow
      }
      bind.class = frist ? 'layout-powerfull' : 'layout-item'
      frist = false

      let child = null
      if (data.component && data.child) {
        child = [].push(slots[data.component][0])
        child = child.concat(getChild(data.child))
      } else if (data.component) {
        child = slots[data.component]
      } else {
        child = getChild(data.child)
      }
      return h('div', bind, child)
    }
    function getChild (child) {
      if (child && child.length) {
        let arr = []
        for (var i = 0; i < child.length; i++) {
          arr.push(getFlex(child[i]))
        }
        return arr
      }
      return ''
    }
  }
}
</script>
