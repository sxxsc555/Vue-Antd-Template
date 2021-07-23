import { reactive, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
// import { isExternal } from '@/utils/validate.js'

function sidebar() {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const state = reactive({
    collapsed: false,
    openKeys: [], // 当前展开的menu
    rootSubmenuKeys: [] // 所有可以被展开的menu
  })
  
  // 获取所有subMenuKey的数组
  function getSubMenuKeys() {
    router.options.routes.forEach((item) => {
      if(!item.meta?.hidden && item.children?.length > 1) {
        state.rootSubmenuKeys.push(item.path)
      }
    })
  }

  // 获取openKeys
  function getOpenKeys() {
    if(!store.getters.sidebar.opened) {
      const matched = Object.create(route.matched)
      matched.pop()
      state.openKeys = matched.map((item) => item.path)
    }
  }

  // 获取缩起/展开状态
  function getOpened() {
    state.collapsed = store.getters.sidebar.opened
  }

  // 监听sidebar并赋值
  function watchSidebar() {
    watch(() => store.getters.sidebar.opened, (newVal) => {
      state.collapsed = newVal

      // 收起状态清空openKeys
      if(newVal) {
        state.openKeys.length = 0
      } else {
        //  展开状态重新获取openKeys
        getOpenKeys()
      }
    })
  }

  // 仅展开当前父级菜单
  function onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)

    if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      state.openKeys = openKeys
    } else {
      state.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }

  // 获取当前点击menuItem并跳转对应路由
  function menuItemClick({ key }) {
    // if(isExternal(key)) {
    //   window.open(key)
    // } else {
    //   router.push({ path: key })
    // }
    router.push({ path: key })
  }

  return {
    state,
    watchSidebar,
    getSubMenuKeys,
    getOpenKeys,
    getOpened,
    onOpenChange,
    menuItemClick
  }
}

export default sidebar