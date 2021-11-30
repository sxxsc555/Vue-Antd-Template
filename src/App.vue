<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import '@/styles/index.scss';
@import '@/styles/antd-ui.scss';
</style>
