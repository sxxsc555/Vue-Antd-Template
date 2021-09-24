<template>
  <div v-if="external" :style="externalStyle" class="svg-icon external-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="IconName" />
  </svg>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const external = computed(() => isExternal(props.iconName))
    const IconName = computed(() => `#icon-${props.iconName}`)
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon' + ' ' + props.className
      } else {
        return 'svg-icon'
      }
    })
    const externalStyle = computed(() => {
      return {
        mask: `url(${props.iconName}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconName}) no-repeat 50% 50%`
      }
    })

    return {
      external,
      IconName,
      svgClass,
      externalStyle
    }
  }
})
</script>

<style lang="scss">
.svg-icon {
  width: 1.6rem;
  height: 1.6rem;
  vertical-align: -0.2rem;
  fill: currentColor;
  overflow: hidden;
}

.external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
