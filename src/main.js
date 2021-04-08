import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// 引入全局样式
import '@/styles/index.scss'
import '@/styles/antd-ui.scss'

// 引入ant-design
import AntDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(AntDesignVue)

// 引入G2图表
import * as G2 from '@antv/g2'
Vue.use(G2)

// 引入路由守卫
import '@/permission'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
