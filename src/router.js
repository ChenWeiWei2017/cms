import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      /*name: 'main',*/
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: '',
          redirect: '/main/home'
        },
        {path: 'sys', redirect: '/main/home'},
        {path: 'content', redirect: '/main/home'},
        {path: 'ctrl', redirect: '/main/home'},
        {path: 'sup', redirect: '/main/home'},
        {path: 'monitor', redirect: '/main/home'},
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: 'sys/server',
          name: 'sys_server',
          component: () => import('./views/sys/Server')
        }
      ]
    }
  ]
})
