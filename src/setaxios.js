import axios from 'axios'
import store from "./store";
import router from "./router";
import {delCookie} from "./cookie";

// Http请求、响应全局拦截配置
export default function setAxios() {
  // 请求拦截
  // 登录成功后，给所有的请求的header中加入token
  axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        config.headers.token = store.state.token;
      }
      return config;
    }
  );

  // 响应拦截，每次请求若是有响应，则先经过这个拦截器
  // 统一处理一些response响应的错误，如未登录、无权限、404等，具体返回值由后端给定
  axios.interceptors.response.use(
    response => {
      // 处理自定义的返回结构状态码
      if (response.status === 200) {
        // 这里对data进行了处理，后续从response里取数据时，直接调用data即可
        const data = response.data;
        if (data.code === -1) {
          // 登录过期 需要重新登录 或是未登录 清空vuex的token和cookie的token并
          store.commit('setToken', '');
          delCookie('token');
          // 跳转至登录页，不将/login放入，以免回退时到login页面
          router.replace({path: '/login'});
        }
        return data;
      }
      return response;
    }
  )
}


