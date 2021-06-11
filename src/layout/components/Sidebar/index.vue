<template>
  <div class="Sidebar-container" :class="{ 'toggleSidebar': collapsed }">
    <logo :collapsed="collapsed" />

    <a-menu
      mode="inline"
      class="Sidebar-menu"
      :inline-collapsed="collapsed"
      :selectedKeys="[route.path]"
      :openKeys="openKeys"
      @click="menuItemClick"
      @openChange="onOpenChange"
    >
      <template v-for="route in routes" :key="route.path">
        <SidebarItem :item="route" :path="route.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isExternal } from '@/utils/validate.js'
import logo from './logo.vue'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    logo,
    SidebarItem
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routes = computed(() => router.options.routes)

    const { 
      state, 
      getSubMenuKeys, 
      getOpenKeys, 
      getOpened, 
      watchSidebar, 
      onOpenChange, 
      menuItemClick
    } = menu()
    
    getSubMenuKeys()
    getOpenKeys()
    getOpened()
    watchSidebar()
    provideCollapsed(state)

    return {
      ...toRefs(state),
      route,
      routes,
      onOpenChange,
      menuItemClick
    }
  }
})

/* 菜单方法集 */
function menu() {
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const state = reactive({
    collapsed: false,
    openKeys: [], // 当前展开的menu
    rootSubmenuKeys: [] // 所有可以被展开的menu
  })
  
  // 获取所有subMenuKey的数组
  function getSubMenuKeys() {
    router.options.routes.forEach((item) => {
      if(!item.hidden && item.children.length > 1) {
        state.rootSubmenuKeys.push(item.path)
      }
    })
  }

  // 获取openKeys
  function getOpenKeys() {
    if(!store.getters.sidebar.opened) {
      const matched = JSON.parse(JSON.stringify(route.matched))
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
    if(isExternal(key)) {
      window.open(key)
    } else {
      router.push({ path: key })
    }
  }

  return {
    state,
    getSubMenuKeys,
    getOpenKeys,
    getOpened,
    watchSidebar,
    onOpenChange,
    menuItemClick
  }
}

/* 推送collapsed值 */
function provideCollapsed(state) {
  provide('collapsed', computed(() => state.collapsed))
}
</script>

<style lang="scss" scoped>
.Sidebar-container {
  position: fixed;
  width: 18.1rem;
  min-height: 100%;
  overflow: hidden;

  &.toggleSidebar {
    width: 7.9rem;
  }

  .Sidebar-menu {
    height: 100%;
    position: absolute;
  }
}
</style>