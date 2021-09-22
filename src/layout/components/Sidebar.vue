<template>
  <div class="Sidebar-container">
    <div class="logo-box">
      <svg-icon iconName="logo" />
      <span v-show="!collapsed">Vue-Antd-Template</span>
    </div>

    <a-menu 
      theme="dark"
      mode="inline"
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
import { defineComponent, computed, toRefs, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
    collapsed: {
      type: Boolean,
      require: true
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routes = computed(() => router.options.routes)

    const { 
      state, 
      getSubMenuKeys,
      getOpenKeys,
      watchSidebar,
      onOpenChange,
      menuItemClick
    } = sidebar()

    getSubMenuKeys()
    getOpenKeys()
    watchSidebar()

    return {
      ...toRefs(state),
      route,
      routes,
      onOpenChange,
      menuItemClick
    }
  }
})

function sidebar() {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const state = reactive({
    openKeys: [], // 当前展开的menu
    rootSubmenuKeys: [] // 所有可以被展开的menu
  })
  
  // 获取所有subMenuKey的数组
  function getSubMenuKeys() {
    router.options.routes.forEach((item) => {
      if(Array.isArray(item.children)){
        if(!item.meta?.hidden && item.children?.length > 1) {
          state.rootSubmenuKeys.push(item.path)
        }
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

  // 监听sidebar并赋值
  function watchSidebar() {
    watch(() => store.getters.sidebar.opened, (newVal) => {
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
    let latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)

    if(latestOpenKey !== undefined) {
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
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
    watchSidebar,
    getSubMenuKeys,
    getOpenKeys,
    onOpenChange,
    menuItemClick
  }
}
</script>

<style lang="scss" scoped>
.Sidebar-container {
  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    white-space:nowrap;
    overflow: hidden;

    span {
      margin-left: 5px;
      color: white;
      font-weight: bold;
      font-size: $standard-font-size-normal;
    }
  }
}
</style>