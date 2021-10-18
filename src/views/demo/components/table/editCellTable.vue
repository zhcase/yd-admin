<!--
 * @Author: zeHua
 * @Date: 2021-08-19 13:36:56
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-28 11:10:15
 * @FilePath: /yd-admin/src/views/demo/components/table/editCellTable.vue
-->
<template>
  <div class="app-container">
    <BasicTable
      :registerTable="table1"
      @handleTableCellEdit="handleEditChange"
      :basicTableOptions="options"
      title="可编辑单元格"
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
      options: {
        api: getList, // 调用接口地址
        apiFormat: 'data.items',
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
          edit: true,
          'show-overflow-tooltip': true,
          width: 200,
          formatter: (e, c, s) => {
            // console.log(e);
            // console.log(c);
            // console.log();
            if (s.$index % 2 != 0) {
              console.log(c);
              return 'hihi';
            }

            return c.author;
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
  methods: {
    handleEditChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.app-container {
  height: 600px;
}
</style>
