<template>
  <div class="Navbar-container">
    <div class="Navbar-left">
      <Hamburger :isActive="isActive" @toggleClick="toggleClick" />
    </div>

    <div class="Navbar-right"><strong>Vue Antd admin</strong></div>
    
    <div class="Navbar-right">
      <a-button
       type="link"
        block
        :loading="btnLoading"
        @click="btnClick"
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
    const store = useStore()
    const router = useRouter()
    let btnLoading = ref(false)
    let isActive = ref(false)

    /* 注销 */
    const btnClick = async () => {
      btnLoading.value = true
      await store.dispatch('user/logout')
      setTimeout(() => {
        btnLoading.value = false
        router.push({ path: '/login' })
      }, 1000)
    }

    /* 切换菜单状态 */
    const toggleClick = async() => {
      await store.dispatch('app/toggleSidebar')
      isActive.value = !isActive.value
    }

    // 监听device并切换菜单状态
    watch(store.getters.device, async(newVal) => {
      if(newVal.value === 'mobile' && !store.getters.sidebar.opened) {
        await store.dispatch('app/toggleSidebar')
        isActive.value = true
      }
    })


    return {
      btnLoading,
      btnClick,
      toggleClick,
      isActive
    }
  }
})
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