// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
// 引入饿了么UI
import Element from 'element-ui';
// 引入饿了么UI样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局格式
import './assets/css/index.css'
// 引入axios
import axios from 'axios';
import { log } from 'util';
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // config ： 是当前 axios 请求的所有参数，有了这个 config 之后 axios 中不能再设置任何属性
  config.headers.Authorization = window.localStorage.getItem("token")
  // 必须在代码结尾添加 
  return config // 否则后续代码不执行
})
// 赋值axios给vue原型
Vue.prototype.$http = axios
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
