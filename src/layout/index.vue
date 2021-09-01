<template>
  <div class="Layout-container">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <Sidebar :collapsed="collapsed" />
      </a-layout-sider>

      <a-layout>
        <a-layout-header>
          <Header :collapsed="collapsed" />
        </a-layout-header>

        <a-layout-content>
          <Content />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { useStore } from 'vuex'
import webView from '@/utils/webView'
import { Sidebar, Header, Content } from './components'

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    Header,
    Content
  },
  setup() {
    const { collapsed, getCollapsed, watchSidebar, watchWebView } = layout()
    watchSidebar()
    watchWebView()
    getCollapsed()

    return {
      collapsed
    }
  }
})

function layout() {
  const store = useStore()
  const collapsed = ref(false)
  
  // 监听sidebar并切换菜单状态
  function watchSidebar() {
    watch(() => store.getters.sidebar.opened, (newVal) => {
      collapsed.value = newVal
    })
  }

  function getCollapsed() {
    collapsed.value = store.getters.sidebar.opened
  }

  // 监听浏览器窗口变化并设置toggleDevice
  function watchWebView() {
    const { mobileType } = webView()

    watch(mobileType, (newVal) => {
      store.dispatch('app/toggleDevice', newVal)
      newVal === 'mobile' ? store.dispatch('app/closeSideBar') : ''
    })
  }

  return {
    collapsed,
    getCollapsed,
    watchSidebar,
    watchWebView
  }
}
</script>

<style lang="scss" scoped>
.Layout-container {
  height: 100%;
  min-height: 100%;
}
</style>
