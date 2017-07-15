export default {
  install: function (Vue) {
    if (!Vue.prototype.utils) Vue.prototype.utils = {}
    Vue.prototype.utils.componentExists = componentExists
  }
}

function componentExists (vm, name) {
  if (vm.$root.$options.components && vm.$root.$options.components[name]) {
    return true
  } else {
    return false
  }
}
