import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

/* 注销 */
function logout() {
  const router = useRouter()
  const store = useStore()
  const loading = ref<boolean>(false)

  // 注销方法
  async function logoutMethod() {
    loading.value = true
    await store.dispatch('user/toggleSidebar')
    setTimeout(() => {
      loading.value = false
      router.push({ path: '/login' })
    }, 1000)
  }

  return {
    loading,
    logoutMethod
  }
}


export default logout