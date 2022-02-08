<template>
  <div class="Sidebar-container">
    <div class="logo-box">
      <svg-icon icon-name="logo" />
      <span v-show="!collapsed">Vue-Antd-Template</span>
    </div>

    <a-menu
      theme="dark"
      mode="inline"
      :selected-keys="[route.path]"
      :open-keys="openKeys"
      @click="menuItemClick"
      @openChange="onOpenChange"
    >
      <template v-for="route in routes" :key="route.path">
        <SidebarItem :item="route" :path="route.path" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import sidebar from '@/hooks/layout/sidebar'
import SidebarItem from './SidebarItem.vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
    collapsed: {
      type: Boolean,
      require: true
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routes = computed(() => router.options.routes)

    const {
      state,
      getSubMenuKeys,
      getOpenKeys,
      watchSidebar,
      watchRoute,
      onOpenChange,
      menuItemClick
    } = sidebar()

    getSubMenuKeys()
    getOpenKeys()
    watchSidebar()
    watchRoute()

    return {
      ...toRefs(state),
      route,
      routes,
      onOpenChange,
      menuItemClick
    }
  }
})
</script>

<style lang="scss" scoped>
.Sidebar-container {
  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    white-space:nowrap;
    overflow: hidden;

    span {
      margin-left: 5px;
      color: white;
      font-weight: bold;
      font-size: $standard-font-size-normal;
    }
  }
}
</style>
