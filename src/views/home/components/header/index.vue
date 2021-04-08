<template>
  <section class="header-container">
    <article class="article-content">

      <div class="content-left">
        <div class="title-text">{{ text }}</div>
        <div class="content-text">前端攻城狮 | 阿里某SmallBaby - 某某某事业 - VUE平台</div>
      </div>

      <div class="statistic-box">
        <div class="state-item">
          <a-statistic title="点赞数" :value="6666" style="margin-right: 40px;">
            <template #suffix>
              <a-icon type="like" />
            </template>
          </a-statistic>
        </div>
        <a-statistic title="比例" :value="80">
          <template #suffix>
            <span> / 100</span>
          </template>
        </a-statistic>
      </div>

    </article>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    },
    created() {
      const NewTime = new Date()
      const NewHours = NewTime.getHours()
      if (NewHours > 5 && NewHours < 12) {
        this.text = '上午好，打工人，来杯咖啡吧'
      } else if (NewHours == 12) {
        this.text = '中午好，打工人，干饭时间到'
      } else if (NewHours > 12 && NewHours < 18) {
        this.text = '下午好，打工人，休息一下吧'
      } else if (NewHours > 17) {
        this.text = '晚上好，打工人，游戏时间到'
      } else {
        this.text = '凌晨好，注意休息，别当夜猫哦'
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header-container {
    .article-content {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFFFFF;
      padding: 0px 20px 0px 20px;
      line-height: 50px;
    }

    .content-left {
      display: flex;
      flex-direction: column;
      align-content: space-around;
      width: 60%;

      .title-text {
        font-size: 2rem;
        font-weight: 500;
        color: black;
      }
    }

    .statistic-box {
      display: flex;
      width: 40%;
      justify-content: flex-end;

      .state-item {
        position: relative;
      }

      .state-item::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 40px;
        top: 10px;
        right: 20px;
        background: #E8E8E8;
      }
    }
  }
</style>
