<template>
  <section class="login-container">
    <a-form
      :form="form"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <img src="../../assets/logo.svg" style="width: 50px;" >
        <h1 style="color: rgb(245, 245, 245);">Vue Antd Template</h1>
        <span style="float: right;line-height: 50px;">欢迎!</span>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              initialValue: 'admin',
              rules: [{ required: true, message: 'Please input your username!' }]
            }
          ]"
          placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: '123456',
              rules: [{ required: true, message: 'Please input your Password!' }]
            }
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          记住密码
        </a-checkbox>
        <a-button type="link" class="login-form-forgot">
          忘记密码
        </a-button>
        <a-button :loading="loading" type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      username: 'admin',
      password: '123456'
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        err && console.log(err)
        if (values) {
          this.loading = true
          this.$store.dispatch('user/login', values)
            .then(() => {
              setTimeout(() => {
                this.loading = false
                this.$router.push({ path: '/' })
                this.$message.success('欢迎回来!')
              }, 1000)
            })
            .catch(() => {
              this.loading = false
              this.$message.error('账号或密码错误！')
            })
        } else {
          console.log('error submit...')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../assets/images/background.jpg);
  background-size: cover;

  .login-form {
    width: 380px;
    min-width: 200px;
    padding: 20px 40px;
    border: 1px solid rgba(240, 240, 240, 0.3);
    border-radius: 8px;
    box-shadow: 0px 0px 5px #f0f1f2;
    background: rgba(255, 255, 255, 0.1);

    .login-form-forgot {
      float: right;
      line-height: 40px;
      padding-right: 0;
    }

    .login-form-button {
      width: 100%;
    }
  }
}
</style>
