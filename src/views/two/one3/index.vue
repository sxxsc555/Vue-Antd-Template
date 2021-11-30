<template>
  <div class="one3-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'One3',
  setup() {
    const data = reactive({
      name: 'one3'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.one3-container {}
</style>
