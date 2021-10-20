/*
 * @Author: zeHua
 * @Date: 2021-07-01 19:23:23
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-19 13:48:01
 * @FilePath: /yd-admin/src/main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/assets/iconfont/iconfont.css'
import "../theme/index.css"
import "@/assets/scss/index.scss"

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
