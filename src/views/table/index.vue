<template>
  <div class="app-container">
    <BasicTable
      :tableData="tableData"
      :registerTable="table1"
      :basicTableOptions="options"
      @changePagination="handleChangePage"
      @changeSwitch="changeSwitch"
      @getTableData="fetchData"
    >
      <template #baseTable>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </template>
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      options: {
        paginationProps: {
          total: 0,
        },
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      table1: [
        {
          title: "公司名称",
          index: "companyName",
          attr: {
            width: 200,
          },
        },
        {
          title: "管理员账号",
          index: "account",
        },
        {
          title: "管理员手机号",
          index: "phone",
        },

        {
          title: "用户状态",
          index: "payStatus",
          type: "radio",
          options: [
            {
              label: false,
              value: 1,
            },
            { label: true, value: 0 },
          ],
        },
        {
          title: "付费状态",
          index: "chargingStatus",
          options: [
            {
              label: "高级会员",
              value: 1,
            },
            { label: "普通会员", value: 0 },
          ],
        },
        {
          title: "操作",
          slot: "baseTable",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    changeSwitch(val, cab) {
      console.log(val);
      cab(true);
    },
    handleChangePage(val) {
      console.log(val);
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        console.log(response);
        this.list = response;
        this.options.paginationProps.total = response.total;
        // this.list = response.rows;
        this.tableData = response.rows;
        this.listLoading = false;
      });
    },
  },
};
</script>
