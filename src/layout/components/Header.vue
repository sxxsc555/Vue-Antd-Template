<template>
  <div class="Header-container">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="changeCollapsed"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="changeCollapsed"
    />

    <a-button :loading="loading" type="link" @click="logoutMethod">退出</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import logout from '@/hooks/common/logout'
import header from '@/hooks/layout/header'

export default defineComponent({
  name: 'Header',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  props: {
    collapsed: {
      type: Boolean,
      require: true
    }
  },
  setup() {
    const { loading, logoutMethod } = logout()
    const { changeCollapsed } = header()

    return {
      loading,
      logoutMethod,
      changeCollapsed
    }
  }
})
</script>

<style lang="scss" scoped>
.Header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: white;

  .trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
</style>
