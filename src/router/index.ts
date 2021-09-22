import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: { hidden: true }
  },
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
          svg: 'logo'
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
      icon: 'icon-qq',
    },
    children: [
      {
        path: 'one1',
        name: 'One1',
        component: () => import('@/views/one/one1/index.vue'),
        meta: {
          title: 'One1',
          icon: 'icon-qq'
        }
      },
      {
        path: 'one2',
        name: 'One2',
        component: () => import('@/views/one/one2/index.vue'),
        meta: {
          title: 'One2',
          icon: 'icon-qq'
        }
      }
    ]
  },

  {
    path: '/two',
    name: 'Two',
    component: layout,
    redirect: '/two/one3',
    meta: {
      title: '第二个',
      icon: 'icon-qq'
    },
    children: [
      {
        path: 'one3',
        name: 'One3',
        component: () => import('@/views/two/one3/index.vue'),
        meta: {
          title: 'One3',
          icon: 'icon-qq'
        }
      },
      {
        path: 'one4',
        name: 'One4',
        redirect: '/two/one4/one5',
        component: () => import('@/views/two/one4/index.vue'),
        meta: {
          title: '第一个',
          icon: 'icon-qq'
        },
        children: [
          {
            path: 'one5',
            name: 'One5',
            component: () => import('@/views/two/one4/one5/index.vue'),
            meta: {
              title: 'One5',
              icon: 'icon-qq'
            }
          },
          {
            path: 'one6',
            name: 'One6',
            component: () => import('@/views/two/one4/one6/index.vue'),
            meta: {
              title: 'One6',
              icon: 'icon-qq'
            }
          }
        ]
      }
    ]
  },

  { path: '/:catchAll(.*)', redirect: '/404', meta: { hidden: true } }
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