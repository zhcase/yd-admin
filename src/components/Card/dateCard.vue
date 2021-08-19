<template>
  <div>
    <el-card
      shadow="never"
      class="date-card"
      :style="{ width: width, height: height }"
    >
      <div class="date-card__header">
        <span
          class="date-card__header__back el-icon-d-arrow-left"
          @click="changeDatePrev"
        ></span>
        {{ currentYear }}
        <span
          class="date-card__header__next el-icon-d-arrow-right"
          @click="changeDateNext"
        ></span>
      </div>
      <div class="date-card__content">
        <el-col :span="6" v-for="(item, index) of data" :key="index">
          <div class="grid-content bg-purple date-card__content__box">
            {{ index + 1 }}
            <div
              class="content"
              :style="{
                fontSize: item && item.fontSize && item.fontSize + 'px',
                color: item && item.color,
              }"
            >
              {{ item && item.content }}
            </div>
          </div>
        </el-col>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    // [{content:}]
    data: {
      type: Array,
      default: () => {
        return new Array(12);
      },
    },
    width: {
      type: String,
      default: () => {
        return 500 + "px";
      },
    },
    height: {
      type: String,
      default: () => {
        return 390 + "px";
      },
    },
    year: {
      // 初始化年
      type: Number,
      default: () => {
        let date = new Date();
        return date.getFullYear();
      },
    },
  },
  data() {
    return {
      currentYear: 0,
    };
  },
  mounted() {
    this.currentYear = this.year;
  },
  methods: {
    // 向上
    changeDatePrev() {
      this.currentYear--;
      this.$emit("changeDate", this.currentYear);
    },
    //下一年
    changeDateNext() {
      this.currentYear++;
      this.$emit("changeDate", this.currentYear);
    },
  },
};
</script>

<style  lang='scss' scoped>
.date-card {
  width: 500px;
  height: auto;
  overflow: hidden;
  .el-card {
    padding: 10px;
  }
  &__header {
    width: 100%;
    line-height: 50px;
    height: 50px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ddd;
    span {
      display: inline-block;
      height: 50px;
      cursor: pointer;
      width: 50px;
      line-height: 50px;
      text-align: center;
    }
    &__back {
      float: left;
      text-align: left;
    }
    &__next {
      float: right;
      text-align: right;
    }
  }
  &__content {
    &__box {
      height: 100px;
      border: 1px solid #ddd;
      overflow: hidden;
      margin-top: -1px;
      margin-left: -1px;
      padding: 10px;
      .content {
        line-height: 50px;
        font-size: 14px;
        text-align: center;
      }
      /* text-align: center; */
    }
  }
}
</style>