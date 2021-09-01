<template>
  <template v-if="!item.meta?.hidden">
    <!-- 只有一个菜单 -->
      <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
        <template v-if="onlyOneChild.meta">
          <a-menu-item :key="resolvePath(onlyOneChild.path)">
            <IconFont :icon="onlyOneChild.meta.icon" />
            <span>{{ onlyOneChild.meta.title }}</span>
          </a-menu-item>
        </template>
      </template>

      <!-- 含有多个子菜单 -->
      <template v-else>
        <a-sub-menu :key="resolvePath(item.path)">
          <template v-if="item.meta" #title>
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

<script>
import { defineComponent, toRefs, reactive } from 'vue'
import { isExternal } from '@/utils/validate'
import IconFont from '@/components/IconFont/index.vue'

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

function sidebarItem(props) {
  const state = reactive({
    onlyOneChild: [],
    subMenus: []
  })

  function resolvePath(routePath) {
    if (isExternal(routePath)) {
      return routePath
    }

    if(!isExternal(props.path) && props.path.includes(routePath)) {
      return props.path
    } else {
      if((routePath.indexOf('/') !== -1) || (props.path === '/')) {
        return props.path + routePath
      } else {
        return props.path + '/' + routePath
      }
    }
  }

  function hasOneShowingChild(children = [], parent) {
    const showChildren = children.filter((item) => {
      // 过滤掉隐藏的路由
      if(item.meta?.hidden) {
        return false
      } else {
        state.onlyOneChild = item
        return true
      }
    })
    
    if(showChildren.length === 1) {
      return true
    }

    if(showChildren.length === 0) {
      state.onlyOneChild = {...parent, path: '', noShowingChildren: true}
      return true
    }

    return false
  }

  return {
    state,
    resolvePath,
    hasOneShowingChild
  }
}
</script>

<style lang="scss" scoped>
.SidebarItem-container {
  padding: 24px 16px;
}
</style>