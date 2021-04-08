import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
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
        component: () => import('@/views/home'),
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
        component: () => import('@/views/one/components/index1'),
        meta: {
          title: 'One1',
          icon: ''
        }
      },

      {
        path: 'one2',
        name: 'One2',
        component: () => import('@/views/one/components/index2'),
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
    redirect: '/two/two1',
    meta: {
      title: '第二个',
      icon: 'mail'
    },
    children: [
      {
        path: 'two1',
        name: 'Two1',
        component: () => import('@/views/two/components/index1'),
        meta: {
          title: 'Two1',
          icon: ''
        }
      },

      {
        path: 'two2',
        name: 'Two2',
        component: () => import('@/views/two/components/index2'),
        meta: {
          title: 'Two2',
          icon: ''
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
