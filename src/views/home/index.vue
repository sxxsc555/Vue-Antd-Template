<template>
  <div class="home-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    const data = reactive({
      name: 'home'
    })

    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.home-container {}
</style>