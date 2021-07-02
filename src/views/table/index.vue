<template>
  <div class="app-container">
    <BasicTable
      :tableData="tableData"
      :registerTable="table1"
      :basicTableOptions="options"
      :formSchema="schemas"
      ref="table"
      @changePagination="handleChangePage"
      @changeSwitch="changeSwitch"
      @getTableData="fetchData"
      @resetForm="resetForm"
    >
      <template #form1>
        <el-form-item label="标题3">
          <el-input v-model="form1" />
        </el-form-item>
      </template>
      <template #toolbarLeft>
        <el-button size="mini" @click="handleEdit([tableData[1], tableData[2]])"
          >Edit</el-button
        >
      </template>
      <template #baseTable>
        <el-table-column align="center" label="操作" fixed="right">
          <template>
            <el-button type="text" icon="el-icon-edit">修改</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>
            <el-button type="text" icon="el-icon-plus">添加</el-button>
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
      form1: "",
      listLoading: true,
      options: {
        basicTableProps: {
          name: 2323,
          ref: "multipleTable",
          select: (e) => {
            console.log(e);
          },
        },
        paginationProps: {
          total: 0,
        },
      },
      schemas: [
        {
          field: "field",
          component: "Input",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          slot: "form1",
          field: "field11",
        },
        {
          field: "field1",
          component: "Select",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
            options: [
              {
                value: "选项1",
                label: "黄金糕",
              },
              {
                value: "选项2",
                label: "双皮奶",
              },
              {
                value: "选项3",
                label: "蚵仔煎",
              },
              {
                value: "选项4",
                label: "龙须面",
              },
              {
                value: "选项5",
                label: "北京烤鸭",
              },
            ],
          },
        },
        {
          field: "field2",
          component: "Input",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          field: "field3",
          component: "Input",
          label: "字段1",
          colProps: {
            span: 8,
          },
          defaultValue: "1",
          componentProps: {
            placeholder: "自定义placeholder",
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ],
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
          type: "selection",
          attr: {
            width: 50,
          },
        },
        {
          title: "id",
          index: "id",
          attr: {
            width: 200,
          },
        },
        {
          title: "管理员账号",
          index: "author",
          attr: {
            "show-overflow-tooltip": true,
            width: 200,
          },
        },
        {
          title: "title",
          index: "title",
        },

        {
          title: "用户状态",
          index: "status",
          // options: [
          //   {
          //     label: false,
          //     value: 1,
          //   },
          //   { label: true, value: 0 },
          // ],
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
          slot: "baseTable",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    resetForm() {
      this.form1 = "";
    },
    handleEdit(row) {
      console.log(this.$refs.table.$refs.multipleTable);
      console.log(this.$refs.table.$refs.multipleTable.setCurrentRow(row));
    },
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
        this.tableData = response.data.items;
        this.options.paginationProps.total = response.data.total;
        // this.tableData = response.rows;
        // this.listLoading = false;
      });
    },
  },
};
</script>
