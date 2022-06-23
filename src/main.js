// import module
import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import ElementUI from 'element-ui'
import Toast from "vue-toastification"
import bus from '@/lib/bus'
import router from '@/router'
import store from '@/store'
// import css
import 'semantic-ui-css/semantic.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-toastification/dist/index.css'

// config
Vue.config.productionTip = false
Vue.config.ignoredElements.push('xml')
Vue.config.ignoredElements.push('block')
Vue.config.ignoredElements.push('field')
Vue.config.ignoredElements.push('category')
Vue.config.ignoredElements.push('sep')
Vue.config.ignoredElements.push('value')
Vue.config.ignoredElements.push('statement')
Vue.config.ignoredElements.push('mutation')

// defined this.$
Object.defineProperty(Vue.prototype, '$bus', bus)

// vue use
Vue.use(SuiVue)
Vue.use(ElementUI, {
  size: 'mini'
})
Vue.use(Toast, {
  position: 'bottom-right',
  timeout: 2500
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
