
import { computed } from 'vue'
import { useRoute } from 'vue-router'

function content() {
  function getKey() {
    const route = useRoute()
    const key = computed(() => route.path)

    return {
      key
    }
  }

  return {
    getKey
  }
}

export default content