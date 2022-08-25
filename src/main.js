// import module
import Vue from 'vue'
import App from './App.vue'
import Bus from '@/lib/bus'
import Api from '@/api/install'
import router from '@/router'
import store from '@/store'
import '@/plugins/key-manager'
import '@/plugins/element'
import '@/plugins/vue-toastification'
import '@/plugins/vue-clipboard2'
import { createPinia, PiniaVuePlugin } from 'pinia'

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

// vue use
Vue.use(Api)
Vue.use(Bus)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

// create instance and mounted
new Vue({
  router,
  store,
  pinia,
  render: h => h(App)
}).$mount('#app')
