import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

interface formStateTypes {
  username: string,
  password: string,
  checkbox: boolean
}

// 表单初始化
function onForm() {
  const router = useRouter()
  const store = useStore()
  const formRef = ref()
  const formState: formStateTypes = reactive({
    username: '',
    password: '',
    checkbox: false
  })
  const rules = {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  }

  // 登录按钮
  function onSubmit() {
    formRef.value
      .validate()
      .then((res: object) => {
        store.dispatch('user/login', res)
        router.push({ path: '/' })
      })
      .catch((error: ValidateErrorEntity<formStateTypes>) => {
        console.log('error', error)
      })
  }

  return {
    formRef,
    formState,
    rules,
    onSubmit
  }
}

export default onForm