<template>
  <div class="one2-container">{{ name }}</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'one2',
  setup() {
    const data = reactive({
      name: 'one2'
    })

    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.one2-container {}
</style>