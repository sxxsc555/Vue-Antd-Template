<template>
  <div class="demo-404">
    <p><span>4</span><span>0</span><span>4</span></p>
    <p>没有找到页面(´･ω･`)，点我＞<a target="_blank" @click="goHome">回到首页</a></p>
  </div>
</template>

<script>
export default {
  name: '404',
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .demo-404 {
    padding: 16%;
  }
  .demo-404 p:first-child {
    text-align: center;
    font-size: 150px;
    font-weight: bold;
    line-height: 100px;
    letter-spacing: 5px;
    color: #fff;
  }

  .demo-404 p:first-child span {
    cursor: pointer;
    text-shadow: 0px 0px 2px #686868,
      0px 1px 1px #ddd,
      0px 2px 1px #d6d6d6,
      0px 3px 1px #ccc,
      0px 4px 1px #c5c5c5,
      0px 5px 1px #c1c1c1,
      0px 6px 1px #bbb,
      0px 7px 1px #777,
      0px 8px 3px rgba(100, 100, 100, 0.4),
      0px 9px 5px rgba(100, 100, 100, 0.1),
      0px 10px 7px rgba(100, 100, 100, 0.15),
      0px 11px 9px rgba(100, 100, 100, 0.2),
      0px 12px 11px rgba(100, 100, 100, 0.25),
      0px 13px 15px rgba(100, 100, 100, 0.3);
  }

  .demo-404 p:last-child {
    text-align: center;
    color: #666;
    font-size: 20px;
    text-shadow: 0 1px 0 #fff;
    letter-spacing: 1px;
    line-height: 2em;
    margin-top: -50px;
  }
</style>
