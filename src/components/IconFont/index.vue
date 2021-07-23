<template>
  <icon-font
    id="icon-font"
    :type="icon" 
    :style="{ 'font-size': fontSize + 'px', 'color': color }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

export default defineComponent({
  components: {
    IconFont
  },
  props: {
    icon: {
      type: String,
      default: 'icon-qq'
    },
    color: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '14'
    }
  }
})
</script>