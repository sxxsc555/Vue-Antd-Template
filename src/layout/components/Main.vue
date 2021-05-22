<template>
  <div class="Main-container">
    <router-view :key="key" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Main',
  setup() {
    const route = useRoute()
    const key = computed(() => route.path)

    return {
      key
    }
  }
})
</script>

<style lang="scss" scoped>
.Main-container {
  height: 100%;
  background: #f0f2f5;
  padding: 20px;
}
</style>