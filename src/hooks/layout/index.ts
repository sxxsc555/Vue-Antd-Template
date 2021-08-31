import { watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import webView from '@/hooks/common/webView'

function layout() {
  const store = useStore()
  const collapsed = ref<boolean>(false)
  
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

export default layout