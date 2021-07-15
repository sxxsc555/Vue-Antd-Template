import router from './router'
import { getToken } from './utils/cookie'
// 引入进度条
import NProgress from 'nprogress'
import '@/styles/nprogress.scss'

NProgress.configure({ showSpinner: false })// 设置圆圈进度条

router.beforeEach((to, from, next) => {
  NProgress.start()// 开启进度条

  const token = getToken('token')
  const path = to.path

  if(token) {
    if(path === '/login') {
      next({ path: '/' })
      NProgress.done()

    } else {
      next()
    }

  } else {
    if(path === '/login') {
      next()

    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
