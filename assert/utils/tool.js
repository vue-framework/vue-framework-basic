export function componentExists (vm, name) {
  if (vm.$root.$options.components && vm.$root.$options.components[name]) {
    return true
  } else {
    return false
  }
}
