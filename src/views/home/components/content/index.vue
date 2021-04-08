<template>
  <section class="content-container">
    <a-row :gutter="20">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="box">
          <a-skeleton :loading="loading" active avatar>
            <Project></Project>
          </a-skeleton>
        </div>

        <div class="box">
          <a-skeleton :loading="loading" active avatar>
            <Bar1 :data="Bar1Data"></Bar1>
          </a-skeleton>
        </div>
      </a-col>

      <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="box">
          <a-skeleton :loading="loading" active avatar>
            <Dynamic></Dynamic>
          </a-skeleton>
        </div>

        <div class="box">
          <a-skeleton :loading="loading" active avatar>
            <regShape></regShape>
          </a-skeleton>
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import Project from './components/left/project'
import Dynamic from './components/right/dynamic'
import Bar1 from '@/components/G2-chart/Bar/1'
import regShape from '@/components/G2-chart/registerShape'

export default {
  components: {
    Project,
    Dynamic,
    Bar1,
    regShape
  },
  data() {
    return {
      loading: true,
      Bar1Data: [
        { xAxis: '1月', yAxis: 1 },
        { xAxis: '2月', yAxis: 5 },
        { xAxis: '3月', yAxis: 10 },
        { xAxis: '4月', yAxis: 15 },
        { xAxis: '5月', yAxis: 20 },
        { xAxis: '6月', yAxis: 30 },
        { xAxis: '7月', yAxis: 35 },
        { xAxis: '8月', yAxis: 40 },
        { xAxis: '9月', yAxis: 50 },
        { xAxis: '10月', yAxis: 70 },
        { xAxis: '11月', yAxis: 90 },
        { xAxis: '12月', yAxis: 100 },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  .content-container {
    padding: 20px;
    .box {
      margin-bottom: 10px;
      background: white;
    }
  }
</style>
