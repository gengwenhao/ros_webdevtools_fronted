import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes"
import {setTitle} from "@/lib/utils"

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(((to, from, next) => {
  setTitle(to.meta.title)

  next()
}))

export default router
