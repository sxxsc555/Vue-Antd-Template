<template>
  <div class="Sidebar-logo-container">
    <router-link to="/">
      <img :src="imgUrl" />
      <strong :class="{ 'hidden': collapsed }">{{ title }}</strong>
    </router-link>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import logo from '@/assets/icons/svg/logo.svg'

export default defineComponent({
  name: 'SidebarLogo',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const data = reactive({
      title: 'Vue Antd admin',
      imgUrl: logo
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.Sidebar-logo-container {
  margin: 7px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  
  img {
    width: 40px;
  }

  .hidden {
    display: none !important;
  }
}
</style>