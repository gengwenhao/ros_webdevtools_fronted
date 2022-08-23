import Toast from "vue-toastification"
import 'vue-toastification/dist/index.css'
import Vue from 'vue'

Vue.use(Toast, {
  position: 'bottom-right',
  timeout: 2500
})
