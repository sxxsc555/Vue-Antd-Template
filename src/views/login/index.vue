<template>
  <div class="login-container">
    <a-form
      ref="formRef"
      class="login-form"
      layout="vertical"
      :model="formState"
      :rules="rules"
    >
      <a-form-item>
        <img src="@/assets/icons/svg/logo.svg" style="width: 50px;" />
        <h1 class="login-title">Vue Antd Template</h1>
        <span class="login-subTitle">欢迎！</span>
      </a-form-item>

      <a-form-item ref="username" label="用户名：" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item ref="password" label="密码：" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="checkbox">
        <a-checkbox v-model:checked="formState.checkbox">记住密码</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="login-form-button" @click="onSubmit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { formRef, formState, rules, onSubmit } = onForm()

    return {
      formRef,
      formState,
      rules,
      onSubmit
    }
  }
})

function onForm() {
  const router = useRouter()
  const store = useStore()

  const formRef = ref()
  const formState = reactive({
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

  /* 登录 */
  function onSubmit() {
    formRef.value
      .validate()
      .then((res) => {
        store.dispatch('user/login', res)
        router.push({ path: '/' })
      })
      .catch(error => {
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
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/login_background.jpg');
  background-size: cover;
  background-position: center;

  .login-form {
    width: 38rem;
    min-width: 20rem;
    padding: 2rem 4rem;
    border: 1px solid rgba(240, 240, 240, 0.3);
    border-radius: 8px;
    box-shadow: 0px 0px 5px #f0f1f2;
    background: rgba(245, 245, 245, 0.4);
  }

  .login-title {
    color: rgb(88, 88, 88)
  }

  .login-subTitle {
    float: right;
    color: #1890FF;
  }

  .login-form-button {
    width: 100%;
    margin-top: 2rem;
  }
}

.ant-form-item {
  margin-bottom: 0;
}

.ant-input {
  background-color: rgba(#ffffff, .6);
}
</style>
