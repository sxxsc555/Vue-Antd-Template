<template>
  <div class="Layout-container">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <Sidebar :collapsed="collapsed" />
      </a-layout-sider>

      <a-layout>
        <a-layout-header>
          <Header :collapsed="collapsed" />
        </a-layout-header>

        <a-layout-content>
          <Content />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sidebar, Header, Content } from './components'
import layout from '@/hooks/layout'

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    Header,
    Content
  },
  setup() {
    const { collapsed, getCollapsed, watchSidebar, watchWebView } = layout()
    watchSidebar()
    watchWebView()
    getCollapsed()

    return {
      collapsed
    }
  }
})
</script>

<style lang="scss" scoped>
.Layout-container {
  height: 100%;
  min-height: 100%;
}
</style>
