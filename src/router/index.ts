import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import layout from '@/layout/index.vue'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },

  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'logo'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = router
  router.resolve = newRouter.resolve
}

export default router