import { useStore } from 'vuex'

function header() {
  const store = useStore()

  async function changeCollapsed() {
    await store.dispatch('app/toggleSidebar')
  }

  return {
    changeCollapsed
  }
}

export default header