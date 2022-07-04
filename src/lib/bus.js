export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$bus', {value: new Vue({})})
  }
}
