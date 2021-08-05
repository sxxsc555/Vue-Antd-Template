<template>
  <template v-if="!item.meta?.hidden">
    <!-- 只有一个菜单 -->
      <template v-if="hasOneShowingChild(item.children, item)">
        <a-menu-item :key="resolvePath(onlyOneChild.path)">
          <IconFont :icon="onlyOneChild.meta.icon" />
          <span>{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </template>

      <!-- 含有多个子菜单 -->
      <template v-else>
        <a-sub-menu :key="resolvePath(item.path)">
          <template #title>
            <IconFont :icon="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </template>

          <template v-for="child in item.children" :key="child.path">
            <SidebarItem :item="child" :path="resolvePath(child.path)" />
          </template>
        </a-sub-menu>
      </template>
  </template>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import IconFont from '@/components/IconFont/index.vue'
import sidebarItem from '@/hooks/layout/sidebar/sidebarItem'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    IconFont
  },
  props: {
    item: {
      type: Object,
      require: true
    },
    path: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { state, resolvePath, hasOneShowingChild } = sidebarItem(props)

    return {
      ...toRefs(state),
      resolvePath,
      hasOneShowingChild
    }
  }
})
</script>

<style lang="scss" scoped>
.SidebarItem-container {
  padding: 24px 16px;
}
</style>