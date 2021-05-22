<template>
  <div class="app-wrapper">
    <Sidebar />
    <div class="content-container" :class="{'toggleSidebar': toggleSidebar}">
      <Navbar />
      <Main />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { Navbar, Sidebar, Main } from './components'

export default defineComponent({
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    Main
  },
  setup() {
    let store = useStore()
    let toggleSidebar = ref(store.getters.sidebar.opened)

    // 监听sidebar变化并赋值toggleSidebar
    watch(store.getters.sidebar, (newVal) => {
      toggleSidebar.value = newVal.opened
    })

    onBeforeMount(() => {
      // 监听窗口大小变化
      window.addEventListener('resize', () => resizeHandler())
    })

    onMounted(() => {
      resizeHandler()
    })

    onBeforeUnmount(() => {
      // 删除窗口监听器
      window.removeEventListener('resize', () => resizeHandler())
    })

    // 判断窗口达到小窗宽度
    const isMobile = () => {
      const { body } = document
      const Width = 992
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < Width
    }

    // store保存当前窗口类型
    const resizeHandler = () => {
      if (!document.hidden) {
        const IsMobile = isMobile()
        store.dispatch('app/toggleDevice', IsMobile ? 'mobile' : 'desktop')
      }
    }

    return {
      toggleSidebar
    }
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;

  .content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 18rem;
    transition: margin-left .25s;

    &.toggleSidebar {
      margin-left: 8rem;
    }
  }
}
</style>
