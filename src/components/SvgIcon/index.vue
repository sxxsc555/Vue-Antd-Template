<template>
  <div v-if="external" :style="externalStyle" class="svg-icon external-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const external = computed(() => isExternal(props.iconClass))
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => {
      if(props.className) {
        return 'svg-icon' + props.className
      } else {
        return 'svg-icon'
      }
    })
    const externalStyle = computed(() => {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    })

    return {
      external,
      iconName,
      svgClass,
      externalStyle
    }
  }
})
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>