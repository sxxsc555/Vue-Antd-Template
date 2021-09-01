import { onBeforeMount, onMounted, onBeforeUnmount, ref } from 'vue'

function webView() {
  const mobileType = ref('')

  onBeforeMount(() => {
    // 监听窗口大小变化
    window.addEventListener('resize', () => resizeHandler())
  })

  onMounted(() => {
    resizeHandler()
  })

  onBeforeUnmount(() => {
    // 删除窗口监听器
    window.removeEventListener('resize', () => resizeHandler())
  })

  // 判断窗口达到小窗宽度
  function isMobile() {
    const { body } = document
    const Width = 992
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < Width
  }

  // store保存当前窗口类型
  function resizeHandler() {
    if (!document.hidden) {
      mobileType.value = isMobile() ? 'mobile' : 'desktop'
    }
  }

  return {
    mobileType
  }
}

export default webView