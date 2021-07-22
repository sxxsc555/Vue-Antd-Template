import { watch, ref } from 'vue'
import { useStore } from 'vuex'

function layout() {
  const store = useStore()
  const collapsed = ref<boolean>(false)
  
  // 监听sidebar并切换菜单状态
  function watchSidebar() {
    watch(() => store.getters.sidebar.opened, (newVal) => {
      collapsed.value = newVal
    })
  }

  return {
    collapsed,
    watchSidebar
  }
}

export default layout