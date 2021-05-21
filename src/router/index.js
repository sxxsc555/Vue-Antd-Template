import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
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
          icon: 'mail'
        }
      }
    ]
  },

  {
    path: '/one',
    name: 'One',
    component: layout,
    redirect: '/one/one1',
    meta: {
      title: '第一个',
      icon: 'mail'
    },
    children: [
      {
        path: 'one1',
        name: 'One1',
        component: () => import('@/views/one1/index.vue'),
        meta: {
          title: 'One1',
          icon: ''
        }
      },

      {
        path: 'one2',
        name: 'One2',
        component: () => import('@/views/one2/index.vue'),
        meta: {
          title: 'One2',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/two',
    name: 'Two',
    component: layout,
    redirect: '/two/one1',
    meta: {
      title: '第二个',
      icon: 'mail'
    },
    children: [
      {
        path: 'one3',
        name: 'One3',
        component: () => import('@/views/one3/index.vue'),
        meta: {
          title: 'One3',
          icon: ''
        }
      },

      {
        path: 'one4',
        name: 'One4',
        component: () => import('@/views/one4/index.vue'),
        meta: {
          title: 'One4',
          icon: ''
        }
      }
    ]
  },

  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
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