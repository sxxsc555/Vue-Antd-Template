import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Form, Checkbox, Input, Select, Menu } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './permission'

const app = createApp(App)

app.use(router)

// 等待路由读取完挂载页面
router.isReady().then(() => {
  app.use(Button).use(Form).use(Checkbox).use(Input).use(Form).use(Select).use(Select).use(Menu)
  app.mount('#app')
})

export default app