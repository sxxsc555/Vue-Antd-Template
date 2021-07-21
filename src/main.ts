import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Button, Form, Checkbox, Input, Select, Menu, Layout } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './permission'
import svgIcon from './components/SvgIcon/index.vue'

const app = createApp(App)

app.use(router)

// 等待路由读取完挂载页面
router.isReady().then(() => {
  app.use(store)
  app.use(Button).use(Form).use(Checkbox).use(Input).use(Form).use(Select)
  .use(Select).use(Menu).use(Layout)
  app.component('svg-icon', svgIcon)
  app.mount('#app')
})

export default app