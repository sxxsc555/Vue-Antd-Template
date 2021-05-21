<template>
  <section class="dynamic-container">
    <a-card :title="title" size="small" style="padding: 0px 10px;">
      <a-progress
        :stroke-color="strokeColor"
        :percent="percent1"
        type="circle"
        title="666"
        style="float: left;margin-left: 20px;"
      />
      <a-progress
        :stroke-color="strokeColor"
        :percent="percent2"
        type="circle"
        style="float: right;margin-right: 20px;"
      />
      <a-progress
        :stroke-color="strokeColor"
        :percent="percent2"
        :status="status"
        style="margin-top: 20px;"
      />
    </a-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '总进度',
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      percent1: 88,
      percent2: 66,
      status: 'active'
    }
  }
}
</script>

<style lang="scss" scoped>
  .dynamic-container{
  }
</style>
