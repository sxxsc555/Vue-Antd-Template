<template>
  <div class="Content-container">
    <router-view :key="key" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Content',
  setup() {
    const { getKey } = content()
    const key = getKey()

    return {
      key
    }
  }
})

function content() {
  function getKey() {
    const route = useRoute()
    const key = computed(() => route.path)

    return {
      key
    }
  }

  return {
    getKey
  }
}
</script>

<style lang="scss" scoped>
.Content-container {
  padding: 24px 16px;
}
</style>