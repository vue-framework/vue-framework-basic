import './src/iconfont'
import './src/icon.css'
export default {
  install: function (Vue) {
    if (!Vue.prototype.utils) Vue.prototype.utils = {}
    Vue.prototype.utils.iconSVG = function (name) {
      if (!name) return ''
      return `<svg class="icon" aria-hidden="true">
                        <use xlink:href="#${name}"></use>
              </svg>`
    }
  }
}
