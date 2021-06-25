<template>
  <div class="Navbar-container">
    <div class="Navbar-left">
      <Hamburger :isActive="isActive" @toggleClick="toggleClick" />
    </div>

    <div class="Navbar-right"><strong>Vue-Antd-Template</strong></div>
    
    <div class="Navbar-right">
      <a-button
       type="link"
        block
        :loading="btnLoading"
        @click="loginOffMethod"
      >
        退出
      </a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Hamburger from '@/components/Hamburger/index.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger
  },
  setup() {
    const { isActive, toggleClick, toggleWatch } = toggle()
    toggleWatch()
    
    const { btnLoading, loginOffMethod } = loginOff()

    return {
      isActive,
      toggleClick,
      btnLoading,
      loginOffMethod
    }
  }
})

function toggle() {
  const store = useStore()
  let isActive = ref(false)

  async function toggleClick() {
    /* 切换菜单状态 */
    await store.dispatch('app/toggleSidebar')
    isActive.value = !isActive.value
  }

  function toggleWatch() {
    // 监听device并切换菜单状态
    watch(() => store.getters.device, async(newVal) => {
      if(newVal === 'mobile' && !store.getters.sidebar.opened) {
        await store.dispatch('app/toggleSidebar')
        isActive.value = true
      }
    })
  }

  return {
    isActive,
    toggleClick,
    toggleWatch
  }
}

function loginOff() {
  const router = useRouter()
  const store = useStore()
  let btnLoading = ref(false)

  /* 注销 */
  async function loginOffMethod() {
    btnLoading.value = true
    await store.dispatch('user/logout')
    setTimeout(() => {
      btnLoading.value = false
      router.push({ path: '/login' })
    }, 1000)
  }

  return {
    btnLoading,
    loginOffMethod
  }
}
</script>

<style lang="scss" scoped>
.Navbar-container {
  padding: 1.3rem;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  background: #FFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>