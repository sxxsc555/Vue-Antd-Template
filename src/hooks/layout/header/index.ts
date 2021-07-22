import { ref } from 'vue'
import { useStore } from 'vuex'

function header() {
  const store = useStore()
  const collapsed = ref<boolean>(false)

  async function changeCollapsed() {
    collapsed.value = !collapsed.value
    await store.dispatch('app/toggleSidebar')
  }

  return {
    collapsed,
    changeCollapsed
  }
}

export default header