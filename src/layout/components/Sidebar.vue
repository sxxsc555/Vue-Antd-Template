<template>
  <div class="Sidebar-container">
    <div class="logo-box">
      <svg-icon iconName="logo" className="logo" />
      <span>Vue-Antd-Ts！</span>
    </div>

      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
      </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    UserOutlined
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1'])
    }
  }
})
</script>

<style lang="scss" scoped>
.Sidebar-container {
  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    span {
      margin-left: 5px;
      color: white;
      font-weight: bold;
      font-size: $standard-font-size-normal;
    }
  }
}
</style>