<template>
  <section class="Main-container">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: 'Main',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .Main-container {
    height: 100%;
    background: #f0f2f5;
    padding: 20px;
  }
</style>
