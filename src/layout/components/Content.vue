<template>
  <div class="Content-container">
    <router-view :key="key" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import content from '@/hooks/layout/content'

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
</script>

<style lang="scss" scoped>
.Content-container {
  padding: 24px 16px;
}
</style>