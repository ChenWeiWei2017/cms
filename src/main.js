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

setaxios();
library.add(fas, fab, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// cookie操作方法
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
