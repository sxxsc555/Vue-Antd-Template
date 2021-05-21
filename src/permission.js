import router from './router'
import { getToken } from '@/utils/auth'

// 引入进度条
import NProgress from 'nprogress'
import '@/styles/nprogress'

// 引入Antd组件
import message from 'ant-design-vue/es/message'

NProgress.configure({ showSpinner: false })// 是否设置圆圈进度条

router.beforeEach(async(to, from, next) => {
  NProgress.start()// 开启进度条

  const hasToken = getToken()
  const path = to.path

  // 判断登录令牌，如果没有跳转登录
  if (hasToken) {
    if (path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (path === '/login') {
      next()
    } else {
      message.loading('登录令牌失效，2秒后重新登录...', 2).then(() => {
        next('/login')
        NProgress.done()
        message.success('跳转成功！')
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
