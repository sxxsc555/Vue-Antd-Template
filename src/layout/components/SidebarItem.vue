<template>
  <template v-if="!item.meta?.hidden">
    <!-- 只有一个菜单 -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <template v-if="onlyOneChild.meta">
        <a-menu-item :key="resolvePath(onlyOneChild.path)">
          <template #icon>
            <SvgIcon v-if="onlyOneChild.meta.svg" :icon-name="onlyOneChild.meta.svg" class-name="svg" />
            <IconFont v-if="onlyOneChild.meta.icon" :icon="onlyOneChild.meta.icon" />
          </template>

          <span>{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </template>
    </template>

    <!-- 含有多个子菜单 -->
    <template v-else>
      <a-sub-menu v-if="item.meta" :key="resolvePath(item.path)">
        <template #icon>
          <SvgIcon v-if="item.meta.svg" :icon-name="item.meta.svg" class-name="svg" />
          <IconFont v-if="item.meta.icon" :icon="item.meta.icon" />
        </template>

        <template #title>
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
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    IconFont,
    SvgIcon
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
