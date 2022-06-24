import axios from 'axios'
import {BASE_URL} from '@/config'

class HttpRequest {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL
    this.queue = {}
  }

  getInsideConfig() {
    // axios 的全局配置
    const config = {
      baseURL: this.baseURL,
      headers: {}
    }

    return config
  }

  setInterceptors(instance, url) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      if (Object.keys(this.queue).length) {
        // 添加全局的 loading
      }
      this.queue[url] = true

      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
      delete this.queue[url]
      const {data, status} = res

      return {data, status}
    }, error => {
      delete this.queue[url]

      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.setInterceptors(instance, options.url)

    return instance(options)
  }
}

export default HttpRequest
