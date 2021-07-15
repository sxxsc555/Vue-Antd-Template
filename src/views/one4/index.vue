<template>
  <div class="one4-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'one4',
  setup() {
    const data = reactive({
      name: 'one4'
    })

    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.one4-container {}
</style>