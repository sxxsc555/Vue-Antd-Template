<template>
  <div class="Header-container">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="() => (collapsed = !collapsed)"
    />
    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />

    <a-button :loading="loading" type="link" @click="logoutMethod">退出</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Header',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    const { loading, logoutMethod } = logout()

    return {
      collapsed: ref<boolean>(false),
      loading,
      logoutMethod
    }
  }
})

/* 注销 */
function logout() {
  const router = useRouter()
  const store = useStore()
  const loading = ref(false)

  // 注销方法
  async function logoutMethod() {
    loading.value = true
    await store.dispatch('user/logout')
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
</script>

<style lang="scss" scoped>
.Header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
</style>