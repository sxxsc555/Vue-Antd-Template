import { watch, ref } from 'vue'
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

  // 监听浏览器窗口变化并设置toggleDevice
  function watchWebView() {
    const { mobileType } = webView()

    watch(mobileType, (newVal) => {
      collapsed.value = (newVal === 'mobile') ? true : false
      store.dispatch('app/toggleDevice', newVal)
    })
  }

  return {
    collapsed,
    watchSidebar,
    watchWebView
  }
}

export default layout