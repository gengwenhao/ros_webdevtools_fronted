import apiList from './index'

const Api = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$api', {value: apiList})
  }
}

export default Api
