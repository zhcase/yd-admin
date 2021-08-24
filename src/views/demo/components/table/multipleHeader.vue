<template>
  <div class="app-container">
    <BasicTable
      :registerTable="table1"
      :basicTableOptions="options"
      title="头部合并"
      :border="true"
    >
      <template slot="index"> </template>
    </BasicTable>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { BasicTable } from "@/components/Table/index";
export default {
  components: {
    BasicTable,
  },
  data() {
    return {
      options: {
        api: getList, // 调用接口地址
        apiFormat: "data.items",
        paginationFormat: "data.total",
      },
      // table 索引
      table1: [
        {
          label: "日期",
          value: "id",
        },
        {
          label: "配送消息",
          children: [
            {
              label: "姓名",
            },
            {
              label: "地址",
              children: [
                {
                  label: "省份",
                },
                {
                  label: "市区",
                },
                {
                  label: "地址",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.app-container {
  height: 600px;
}
</style>