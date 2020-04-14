// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import { getUser, removeUser } from '@/utils/auth'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vant from 'vant';
import 'vant/lib/index.css'

import './styles/index.css'

// axios.defaults.baseURL = 'http://192.168.123.124:8083/' // 设置基本请求网址

Vue.use(ElementUI)
Vue.use(Vant)

// Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
