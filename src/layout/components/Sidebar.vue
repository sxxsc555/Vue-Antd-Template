<template>
  <div class="Sidebar-container" :class="{ 'toggleSidebar': collapsed }">
    <div class="Sidebar-logo" @click="logoClick">
      <img src="@/assets/icons/svg/logo.svg" />
      <strong :class="{ 'hidden': collapsed }">Vue Antd admin</strong>
    </div>

    <a-menu
      mode="inline"
      class="Sidebar-menu"
      :inline-collapsed="collapsed"
      :openKeys="openKeys"
      :selectedKeys="[route.path]"
      @select="menuItemSelect"
      @openChange="onOpenChange"
    >
      <template v-for="route in routes">
        <template v-if="!route.hidden">
          <!-- 只有一个菜单 -->
          <template v-if="route.children.length === 1">
            <a-menu-item :key="route.redirect">
              <svg-icon iconClass="logo"></svg-icon>
              <span class="spanStyle" :class="{ 'hidden': collapsed }">{{ route.children[0].meta.title }}</span>
            </a-menu-item>
          </template>

          <!-- 含有多个子菜单 -->
          <template v-else>
            <a-sub-menu :key="menuKey(route.path)">
              <template #title>
                <svg-icon iconClass="logo"></svg-icon>
                <span class="spanStyle" :class="{ 'hidden': collapsed }">{{ route.meta.title }}</span>
              </template>

              <a-menu-item v-for="child in route.children" :key="menuItemKey(route.path, child.path)">
                <span>{{ child.meta.title }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    let router = useRouter()
    let route = useRoute()
    let routes = computed(() => router.options.routes)
    let store = useStore()
    const state = reactive({
      collapsed: false,
      selectedKeys: [], // 当前被选中menu
      openKeys: [], // 当前展开的menu
      rootSubmenuKeys: [] // 所有可以被展开的menu
    })

    /* 获取keys */
    const { path } = route
    const openPath = [route.matched[route.matched.length - 2].path]
    state.openKeys = openPath

    /* 获取数据项值 */
    const opened = store.getters.sidebar.opened
    state.collapsed = opened

    // 监听sidebar并赋值
    watch(() => store.getters.sidebar.opened, (newVal) => {
      state.collapsed = newVal

      // 收起状态清空openKeys
      if(newVal) {
        state.openKeys.length = 0

      } else {
        //  展开状态重新获取openKeys
        const openPath = [route.matched[route.matched.length - 2].path]
        state.openKeys = openPath
      }
    })

    /* 获取menuKey */
    const menuKey = (key) => {
      state.rootSubmenuKeys.push(key)
      return key
    }

    /* 获取mentItemKey */
    const menuItemKey = (key1, key2) => key1 + '/' + key2

    /* 获取当前点击menuItem并跳转对应路由 */
    const menuItemSelect = (event) => {
      let { key } = event
      router.push({ path: key })
    }

    /* 只展开当前父级菜单 */
    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }

    const logoClick = () => {
      router.push({ path: '/' })
    }

    return {
      ...toRefs(state),
      route,
      routes,
      menuKey,
      menuItemKey,
      menuItemSelect,
      onOpenChange,
      logoClick
    }
  }
})
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

    .spanStyle {
      font-weight: 600;
      margin-left: 2rem;
    }
  }

  .hidden {
    display: none !important;
  }

  .Sidebar-logo {
    margin: 7px;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    
    img {
      width: 40px;
    }
  }
}
</style>