import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
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