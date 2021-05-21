<template>
  <section class="project-container">
    <a-card title="进行中的项目">
      <a slot="extra" href="#">
        <a-icon type="caret-down" size="large" @click="hiddenCard"/>
      </a>

      <a-card-grid
        v-for="(item, index) in gridData"
        v-show="!hidden"
        :key="index"
        class="grid-item"
      >
        <a-card-meta :title="item.title" :description="item.description">
          <a-avatar slot="avatar" :src="item.src" size="large"/>
        </a-card-meta>

        <div class="grid-footer">
          <div class="footer-item">{{ item.author }}</div>
          <div class="data-time">{{ item.dataTime }}</div>
        </div>
      </a-card-grid>
    </a-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hidden: false,
      gridData: [
        {
          title: 'Vue.js',
          src: 'https://cn.vuejs.org/images/logo.png',
          description: 'Vue是一套用于构建用户界面的JavaScript渐进式框架',
          author: '科学搬砖组',
          dataTime: '6小时前'
        },
        {
          title: 'React.js',
          src: 'https://www.runoob.com/wp-content/uploads/2016/02/react.png',
          description: 'React 是一个用于构建用户界面的JavaScript库',
          author: '最强打工人',
          dataTime: '8小时前'
        },
        {
          title: 'TypeScript',
          src: 'https://www.runoob.com/wp-content/uploads/2019/01/typescript-logo.jpg',
          description: 'ypeScript 是 JavaScript 的一个超集',
          author: 'CV高级工程师',
          dataTime: '12小时前'
        },
        {
          title: 'Node.js',
          src: 'https://www.runoob.com/wp-content/uploads/2014/03/nodejs.jpg',
          description: 'Node.js 就是运行在服务端的 JavaScript',
          author: '科学搬砖组',
          dataTime: '6小时前'
        },
        {
          title: 'Webpack',
          src: 'https://www.runoob.com/wp-content/uploads/2017/01/what-is-webpack.png',
          description: 'Webpack 是一个前端资源加载/打包工具',
          author: '最强打工人',
          dataTime: '8小时前'
        },
        {
          title: 'Ant Design',
          src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          description: '基于 Ant Design 设计体系的 React UI 组件库',
          author: 'CV高级工程师',
          dataTime: '12小时前'
        }
      ]
    }
  },
  methods: {
    hiddenCard() {
      this.hidden = !this.hidden
    }
  }
}
</script>

<style lang="scss" scoped>
  .project-container {
    .grid-item {
      width: 33.33%;
      height: 150px;
      .grid-footer {
        display: flex;
        justify-content: space-between;
        padding: 20px 0px;
        .footer-item {
          font-size: 1.2rem;
        }

        .data-time {
          font-size: 1.2rem;
          font-weight: 500;
        }
      }
    }
  }
</style>
