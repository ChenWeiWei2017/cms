import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {getCookie, setCookie, delCookie} from "./cookie";
import setaxios from './setaxios'
import el from "element-ui/src/locale/lang/el";

setaxios();
library.add(fas, fab, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// cookie操作方法
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;

// 路由守卫
router.beforeEach((to, from, next) => {
  // 无论是刷新路由还是跳转路由，第一个进入这个钩子函数
  let token = getCookie('token');
  store.commit('setToken', token);
  // 判断进入的路由是否需要token
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      // 跳转到登录页，并将本要访问的地址作为参数返回
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
