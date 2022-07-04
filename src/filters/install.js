import * as filters from './index'

export default {
  install(Vue) {
    // 注册全局过滤器
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}
