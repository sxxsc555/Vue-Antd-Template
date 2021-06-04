<template>
  <div class="svgIcon-container">
    <svg-icon :iconClass="icon" :class="{'bigSvg': collapsed && isOnlyOnePath}"></svg-icon>
    <span class="spanStyle" :class="{'hidden': collapsed && isOnlyOnePath}">{{ title }}</span>
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'item',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const collapsed = inject('collapsed')
    const router = useRouter()
    const routes = computed(() => router.options.routes)
    const onlyOnePaths = routes.value.map((item) => item.path)
    const isOnlyOnePath = onlyOnePaths.filter((item) => item === props.path).length > 0

    return {
      collapsed,
      isOnlyOnePath
    }
  }
})
</script>

<style lang="scss" scoped>
.svgIcon-container {
  margin-left: -0.7rem;

  .bigSvg {
    width: 2em;
    height: 2em;
  }

  .spanStyle {
    font-weight: 600;
    margin-left: 1rem;
  }

  .hidden {
    display: none !important;
  }
}
</style>
