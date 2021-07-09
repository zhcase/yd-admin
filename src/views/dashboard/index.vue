<!--
 * @Author: zeHua
 * @Date: 2021-07-02 13:43:42
 * @LastEditors: zeHua
 * @LastEditTime: 2021-07-08 15:24:21
 * @FilePath: /yd-admin/src/views/dashboard/index.vue
-->
<template>
  <div class="page-dashboard">
    <div class="temp-block">
      <!-- <div class="slogan">欢迎进入{{ title }}</div> -->

      <Flow />
    </div>
  </div>
</template>

<script>
import defaultSettings from "@/settings";
import Flow from "@/components/Flow/index";
export default {
  name: "Dashboard",
  components: {
    Flow,
  },
  data() {
    return {
      title: defaultSettings.title,
    };
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
