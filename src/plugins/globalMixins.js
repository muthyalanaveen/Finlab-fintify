/**
 * You can register global mixins here
 */

const GlobalMixins = {
  install (Vue) {
    Vue.mixin({
      mounted () {
        const { bodyClass } = this.$options
        if (bodyClass) {
          document.body.classList.add(bodyClass)
        }
      },
      beforeUnmount () {
        const { bodyClass } = this.$options
        if (bodyClass) {
          document.body.classList.remove(bodyClass)
        }
      }
    })
  }
}

export default GlobalMixins
