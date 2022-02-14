import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', meta: { title: 'title' }, component: () => import('../page/login') },
 
   
  ]
})

router.beforeEach((to, form, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// const router = new Router({
//   mode: Config.hash ? 'hash' : 'history',
//   routes: Routes.activity
// })

export default router

