<template>
  <section class="home-container">
    <Header/>
    <Content/>
  </section>
</template>

<script>
import Header from './components/header'
import Content from './components/Content'

export default {
  components: {
    Header,
    Content
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    margin: -20px;
  }
</style>
