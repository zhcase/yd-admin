<!--
 * @Author: zeHua
 * @Date: 2021-07-02 13:43:42
 * @LastEditors: zeHua
 * @LastEditTime: 2021-07-08 15:24:21
 * @FilePath: /yd-admin/src/views/dashboard/index.vue
-->
<template>
  <div class="page-dashboard">
    <el-row>
      <el-col
        :span="5"
        v-for="(o, index) in 4"
        :key="o"
        :offset="index > 0 ? 1 : 1"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>访问数</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div id="container"></div>

          <div style="padding: 14px">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import defaultSettings from "@/settings";
import { Chart } from "@antv/g2";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {};
  },
  mounted() {
    const chart = new Chart({
      container: "container",
      width: 600,
      height: 300,
    });
    chart.source(data);
  },
};
</script>

<style lang="scss">
/* .page-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .temp-block {
    .slogan {
      font-size: 24px;
    }
  }
} */
</style>
