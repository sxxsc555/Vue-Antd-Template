<template>
  <template v-if="!item.hidden">
    <!-- BUG!!! menu-item的key会被父组件遍历的key影响 暂时通过套menu-item-group标签解决 -->
    <a-menu-item-group>
      <!-- 只有一个菜单 -->
      <template v-if="hasOneShowingChild(item.children, item)">
        <a-menu-item :key="resolvePath(onlyOneChild.path)">
          <item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" :path="item.path" />
        </a-menu-item>
      </template>

      <!-- 含有多个子菜单 -->
      <template v-else>
        <a-sub-menu :key="resolvePath(item.path)">
          <template #title>
            <item :icon="item.meta.icon" :title="item.meta.title" :path="resolvePath(item.path)" />
          </template>

          <template v-for="child in item.children" :key="child.path">
            <SidebarItem :item="child" :path="resolvePath(child.path)" />
          </template>
        </a-sub-menu>
      </template>
    </a-menu-item-group>
  </template>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import item from './item.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    item
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
    const { data, resolvePath, hasOneShowingChild } = getMenuKeys(props)

    return {
      ...toRefs(data),
      resolvePath,
      hasOneShowingChild
    }
  }
})

/* 获取menuKeys集合 */
function getMenuKeys(props) {
  const data = reactive({
    onlyOneChild: [],
    subMenus: []
  })

  function resolvePath(routePath) {
    let path = ''

    if(props.path.includes(routePath)) {
      path = props.path
    } else {
      if((routePath.indexOf('/') !== -1) || (props.path === '/')) {
        path = props.path + routePath
      } else {
        path = props.path + '/' + routePath
      }
    }
    
    return path
  }

  function hasOneShowingChild(children = [], parent) {
    const showChildren = children.filter((item) => {
      if(item.hidden) {
        return false
      } else {
        data.onlyOneChild = item
        return true
      }
    })

    if(showChildren.length === 1) {
      return true
    }

    if(showChildren.length === 0) {
      data.onlyOneChild = {...parent, path: ''}
      return true
    }

    return false
  }

  return {
    data,
    resolvePath,
    hasOneShowingChild
  }
}
</script>
