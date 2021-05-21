<template>
  <svg
    class="hamburger"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    :class="{'isActive': isActive}"
    @click="toggleClick"
  >
    <path p-id="16470" d="M0 124.16l0 170.66496 1024 0L1024 124.16 0 124.16zM0 593.4976l1024 0L1024 422.82496 0 422.82496 0 593.4976zM0 892.16l1024 0L1024 721.4976 0 721.4976 0 892.16z" />
  </svg>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const toggleClick = () => {
      emit('toggleClick')
    }

    return {
      toggleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 2.6rem;
  height: 2.6rem;
  cursor: pointer;
  transition: all .3s;

  &.isActive {
    transform: rotate(180deg);
  }

  path {
    fill: black;
  }
}
</style>
