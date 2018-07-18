import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'



Vue.use(Router);

export default new Router({
  // base: '/admin/company/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },

  ]
})
