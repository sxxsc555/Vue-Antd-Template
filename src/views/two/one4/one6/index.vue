<template>
  <div class="one6-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'one6',
  setup() {
    const data = reactive({
      name: 'one6'
    })

    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.one6-container {}
</style>