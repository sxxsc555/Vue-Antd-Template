<template>
  <div class="app-wrapper">
    <Sidebar />
    <div class="content-container" :class="{ 'toggleMargin': toggleMargin }">
      <Navbar />
      <Main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, Main } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    Main
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    toggleMargin() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: row;

    .content-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 179px;
      transition: margin-left .3s;
    }
    .content-container.toggleMargin {
      margin-left: 80px;
    }
  }
</style>
