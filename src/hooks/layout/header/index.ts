import { ref, watch } from 'vue'
import { useStore } from 'vuex'

function header() {
  const store = useStore()
  const collapsed = ref<boolean>(false)

  async function changeCollapsed() {
    collapsed.value = !collapsed.value
    await store.dispatch('app/toggleSidebar')
  }

  // 监听sidebar并切换菜单状态
  function watchDevice() {
    watch(() => store.getters.device, (newVal) => {
      const _newVal = (newVal === 'mobile') ? true : false
      if(_newVal !== collapsed.value) {
        collapsed.value = _newVal
        store.dispatch('app/toggleSidebar')
      }
    })
  }

  return {
    collapsed,
    changeCollapsed,
    watchDevice
  }
}

export default header