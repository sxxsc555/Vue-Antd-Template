<template>
  <section class="chart-container">
    <div class="chart-header">月进度</div>
    <div id="bar1-chart"></div>
  </section>
</template>

<script>
import { Chart } from '@antv/g2'

  export default {
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    watch: {
      data() {
        this.Chart()
      }
    },
    mounted() {
      this.Chart()
    },
    methods: {
      Chart() {
        const chart = new Chart({
          container: 'bar1-chart',  // 指定绘制chart的容器
          height: 200,  // 定义chart高度
          autoFit: true,  // 设置chart宽高自适应
          padding: [20, 20, 40, 30]  // 设置chart内边距
        })

        chart.data(this.data);  // 插入数据

        chart.tooltip({
          showMarkers: false  // 图例标点
        })
        chart.interval().position('xAxis*yAxis')
        chart.interaction('element-highlight')  // chart交互之鼠标hover高亮
        chart.render()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-container {
    padding: 0px 10px;

    .chart-header {
      padding: 10px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid #e8e8e8;
    }
  }
</style>
