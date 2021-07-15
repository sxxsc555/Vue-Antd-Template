<template>
  <div class="one1-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'one1',
  setup() {
    const data = reactive({
      name: 'one1'
    })

    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.one1-container {}
</style>