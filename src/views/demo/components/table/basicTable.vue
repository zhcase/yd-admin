<!--
 * @Author: zeHua
 * @Date: 2021-07-06 14:25:26
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-10 10:59:08
 * @FilePath: /yd-admin/src/views/demo/components/table/basicTable.vue
-->
<template>
  <div class="app-container">
    <BasicTable
      :registerTable="table1"
      v-if="demoStr"
      :basicTableOptions="options"
      :span-method="objectSpanMethod"
      title="基础示例"
      :border="true"
    >
      <template slot="index"> </template>
    </BasicTable>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import { BasicTable } from '@/components/Table/index';
export default {
  components: {
    BasicTable,
  },
  data() {
    return {
      demoStr: '',
      options: {
        api: getList, // 调用接口地址
        apiFormat: 'data.items',
        apiParams: { a: 1, b: 2 },
        paginationFormat: 'data.total',
      },
      // table 索引
      table1: [
        {
          label: 'id',
          value: 'id',
          width: 150,
          sortable: true,
        },
        {
          label: '管理员账号',
          value: 'author',
          'show-overflow-tooltip': true,
          width: 200,
          formatter: (e) => {
            if (e == 1) {
              return 'hihi hi';
            }
            return e;
            // console.log(e);
          },
        },
        {
          label: 'title',
          value: 'title',
          'show-overflow-tooltip': true,
          width: 200,
        },
        {
          label: '用户状态',
          value: 'status',
          options: [
            {
              label: '删除',
              value: 'deleted',
            },
            { label: '发表', value: 'published' },
          ],
        },
      ],
    };
  },
  created() {
    setTimeout(() => {
      this.demoStr = 'demoTest';
    }, 500);
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  height: 600px;
}
</style>
