<template>
  <section class="Navbar-container">
    <a-icon :class="{'isActive': isActive}" :type="type" class="menu-icon" @click="toggleSidebar" />

    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index === levelList.length - 1">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </a-breadcrumb-item>
    </a-breadcrumb>

    <div style="flex-grow: 2;"/>

    <a-button :loading="loading" type="link" @click.native="logout">退出</a-button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      type: 'right-square',
      loading: false,
      levelList: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // 切换侧边栏
    isActive() {
      if (this.sidebar.opened) {
        return this.sidebar.opened
      } else {
        return false
      }
    },
    // 获取路由表
    routes() {
      return this.$router.options.routes
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // 过滤出$route中所有带有meta属性的路由记录
      let matched = this.$route.matched.filter(item => item.meta)
      // 获取第一条记录
      const first = matched[0]
      // 在非首页导航前增加一个首页导航
      if (first.name) {
        matched = [{ redirect: '/', meta: { title: '首页' }}].concat(matched)
      }
      // 过滤matched中所有带有meta属性的路由记录
      this.levelList = matched.filter(item => item.meta && item.meta.title)
    },

    // 点击按钮切换侧边栏
    toggleSidebar() {
      this.$store.dispatch('app/toggleSidebar')
      this.isActive = !this.isActive
    },

    // 重定向路由
    handleLink(item) {
      const { redirect } = item
      if (redirect) {
        this.$router.push(redirect)
      }
    },

    // 注销
    async logout() {
      this.loading = true
      await this.$store.dispatch('user/logout')
      setTimeout(() => {
        this.loading = false
        this.$router.push({ path: '/login' })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .Navbar-container {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    background: #FFF;
    padding: 0px 20px;

    span {
      font-weight: 600;
    }

    .menu-icon {
      margin-right: 20px;
      font-size: 2.8rem;
      cursor: pointer;
      transition: .3s;
    }

    .menu-icon.isActive {
      transform: rotate(180deg);
    }

    .ant-breadcrumb {
      font-size: 1.6rem;

      .anticon {
        font-size: 2rem;
      }
    }
  }
</style>
