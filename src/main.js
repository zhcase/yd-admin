/*
 * @Author: zeHua
 * @Date: 2021-07-01 19:23:23
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-19 13:48:01
 * @FilePath: /yd-admin/src/main.js
 */
import './public-path'
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/assets/iconfont/iconfont.css'
import "../theme/index.css"
import "@/assets/scss/index.scss"
import VueRouter from 'vue-router'
import { setToken } from '@/utils/auth'

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

// 微服务
let routes = null
let instance = null

function render(props = {}) {
  let {token,container}=props;
  console.log(token);
  console.log(container);
  setToken(token);
  instance = new Vue({
    router,
    store,
    // el: '#micro-app-child',
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#micro-app-child') : '#micro-app-child');

}


export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  console.log('卸载咯')
  // instance.$el.innerHTML = ''
  // instance = null
  // router = null
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
// new Vue({
//   el: '#child',
//   router,
//   store,
//   render: h => h(App)
// })
