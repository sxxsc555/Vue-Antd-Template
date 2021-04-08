<template>
  <section class="Sidebar-container" :class="{ 'toggleSidebar': toggleSidebar }">
    <header class="logo">
      <img src="../../assets/logo.svg" />
      <strong>Vue Antd Admin</strong>
    </header>
    <nav>
      <a-menu
        :inline-collapsed="isCollapsed"
        :selected-keys="activeMenu"
        :default-open-keys="openKeys"
        @openChange="onOpenChange"
        @select="selectItem"
        style="height: 100%;position: absolute;"
        mode="inline"
      >

        <template v-for="route in routes">
          <template v-if="!route.hidden">

            <!-- 只有一个菜单 -->
            <template v-if="route.children.length === 1">
              <a-menu-item :key="route.redirect">
                <a-icon :type="route.children[0].meta.icon"></a-icon>
                <span class="spanStyle">{{ route.children[0].meta.title }}</span>
              </a-menu-item>
            </template>

            <!-- 含有多个子菜单 -->
            <template v-else>
              <a-sub-menu :key="route.path">
                <span slot="title">
                  <a-icon :type="route.meta.icon"></a-icon>
                  <span class="spanStyle">{{ route.meta.title }}</span>
                </span>
                <template v-for="child in route.children">
                  <a-menu-item :key="menuItemKey(route.path, child.path)">
                    <a-icon :type="child.meta.icon"></a-icon>
                    <span>{{ child.meta.title }}</span>
                  </a-menu-item>
                </template>
              </a-sub-menu>
            </template>

          </template>
        </template>

      </a-menu>
    </nav>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'

export default {
  data() {
    return {
      toggleSidebar: false,
      rootSubmenuKeys: [],
      lastPath: '',
      subMenuPath: '',
      openKeys: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),

    // 切换侧边栏并执行toggle
    isCollapsed() {
      this.toggle(this.sidebar.opened)
      return !this.sidebar.opened
    },

    // 获取路由表
    routes() {
      return this.$router.options.routes
    },

    // 当前选择菜单
    activeMenu() {
      const route = this.$route
      const { path } = route
      return [path]
    },

    // 获取menuItemKey路径
    menuItemKey() {
      return (key1, key2) => {
        // 合并key1，key2
        const Key = path.resolve(key1, key2)
        return Key
      }
    },
  },
  watch: {
    $route() {
      this.activeMenu()
    }
  },
  methods: {
    // 保存subMenu key的值
    subMenuClick(val) {
      this.subMenuPath = val
    },

    // 切换顶部导航栏
    toggle(val) {
      this.toggleSidebar = !val
    },

    // 只展开当前父级菜单
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1)
      if(this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },

    // 选中菜单项
    selectItem({ key }) {
      // 跳转路由
      this.$router.push(key)
    },

    // 路由过滤器
    hasOneShowChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if(item.hidden) {
          return false
        } else {
          return true
        }
      })

      if(showingChildren.length === 1) {
        return true
      }

      if(showingChildren === 0) {
        return false
      }

      if(showingChildren > 1) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .Sidebar-container {
    position: fixed;
    width: 180px;
    min-height: 100%;
    overflow: hidden;
    &.toggleSidebar {
      width: 80px;
    }

    .spanStyle {
      font-weight: 600;
    }

    .logo {
      height: 40px;
      background: rgba(255, 255, 255, .2);
      margin: 8px;
      overflow: hidden;
      text-align: center;
      
      img {
        width: 40px;
      }
    }
  }
</style>
