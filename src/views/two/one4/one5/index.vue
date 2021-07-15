<template>
  <div class="one5-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'one5',
  setup() {
    const data = reactive({
      name: 'one5'
    })

    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.one5-container {}
</style>