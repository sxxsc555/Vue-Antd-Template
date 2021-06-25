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
    // 监控窗口大小变化
    watchWindow()
    const { toggleSidebar } = onToggleSidebar()

    return {
      toggleSidebar
    }
  }
})

function onToggleSidebar() {
  const store = useStore()
  let toggleSidebar = ref(store.getters.sidebar.opened)

  // 监听sidebar变化并赋值toggleSidebar
  watch(() => store.getters.sidebar.opened, (newVal) => {
    toggleSidebar.value = newVal
  })

  return {
    toggleSidebar
  }
}

function watchWindow() {
  const store = useStore()

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
  function isMobile() {
    const { body } = document
    const Width = 992
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < Width
  }

  // store保存当前窗口类型
  function resizeHandler() {
    if (!document.hidden) {
      const IsMobile = isMobile()
      store.dispatch('app/toggleDevice', IsMobile ? 'mobile' : 'desktop')
    }
  }
}
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
    transition: margin-left .28s;

    &.toggleSidebar {
      margin-left: 8rem;
    }
  }
}
</style>
