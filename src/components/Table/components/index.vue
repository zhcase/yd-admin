<!--
 * @Author: zeHua
 * @Date: 2021-07-02 15:09:51
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-21 14:03:52
 * @FilePath: /yd-admin/src/components/Table/components/index.vue
-->
<template>
  <div class="base-table">
    <div class="base-table__form" v-if="formSchema.length > 0">
      <BasiceForm
        :schema="formSchema"
        :label-width="130"
        :formModel="form"
        ref="basicForm"
        @handleSubmit="handleQuery"
        @resetForm="handleFormReset"
      >
        <template v-slot:[item.slot] v-for="item in formSchema">
          <template v-if="item.slot">
            <slot :name="item.slot"></slot>
          </template>
        </template>
      </BasiceForm>
    </div>

    <div class="base-table-wrapper">
      <div class="base-table__toolbar">
        <span class="base-table__toolbar__title">
          <el-button
            type="default"
            @click="handleDownload"
            size="small"
            v-if="isHiddenDownload"
            >导出</el-button
          >
          <slot name="toolbarLeft"> {{ title }}</slot>
        </span>
        <!-- 右侧 -->
        <div class="base-table__header__toolbar">
          <span>
            <el-tooltip content="刷新" placement="top">
              <i class="el-icon-refresh" @click="handleRefresh"></i>
            </el-tooltip>
          </span>
        </div>
      </div>

      <el-table
        :data="tableData"
        :stripe="true"
        v-loading="tableLoading"
        id="table"
        height="100%"
        ref="table"
        v-on="$listeners"
        v-bind="$attrs"
        class="base-table__tables"
      >
        <template v-for="item of registerTable">
          <!-- 是否隐藏该列 -->
          <template v-if="!item.isHidden">
            <el-table-column
              type="selection"
              width="55"
              :key="item.value"
              v-if="item.type === 'selection'"
            >
            </el-table-column>

            <slot v-else-if="item.slot" :name="item.slot"> </slot>
            <tableColumn
              :item="item"
              v-else
              @handleTableCellEdit="handleEditConfirm"
              :key="item.value"
              @updateTableData="handleUpdateTableData"
            />
          </template>
        </template>
      </el-table>
      <slot name="tableFooter"></slot>
      <template v-if="basicTableOptions.paginationProps">
        <div class="base-table__pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationConfig.currentPage"
            :page-size="paginationConfig.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationConfig.total || 0"
          >
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { downloadExcel } from "./excel.js";
import { BasiceForm } from "@/components/Form/index.js";
import tableColumn from "./tableColumn.vue";
export default {
  components: {
    BasiceForm,
    tableColumn,
  },
  data() {
    return {
      form: {}, //form 表单
      formVisible: false, //
      tableData: [],
      tableLoading: false,

      // 分页
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  props: {
    title: {
      type: String,
    },
    // table 数据
    basicTableData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // table 索引与title
    registerTable: {
      required: true,
      type: Array,
      default: () => {
        return [];
      },
    },
    // table 配置
    basicTableOptions: {
      required: false,
      type: Object,
      default: {},
    },
    formSchema: {
      required: false,
      type: Array,
      default: () => {
        return [];
      },
    },
    isHiddenDownload: {
      // 是否显示隐藏下载按钮
      required: false,
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },

  watch: {
    basicTableOptions(val) {
      console.log(val);
    },
  },
  created() {
    console.log(this.registerTable);
  },
  mounted() {
    this.handleQuery();
    this.changeFormVisible();
  },
  methods: {
    handleStopFoucs(e) {
      e.preventDefault();
    },
    /**
     * 修改确认
     */
    handleEditConfirm(params) {
      this.$emit("handleTableCellEdit", params);
    },

    /**
     * 更新Table数据
     *
     */
    handleUpdateTableData() {
      this.tableData.splice(1, 0);
    },
    // 下载excel文档
    handleDownload() {
      downloadExcel(this.registerTable, this.tableData);
    },
    formatJson(filterVal) {
      return this.tableData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    // 查询
    handleQuery(form = {}) {
      //table 滚动条滚动到顶部
      this.$refs.table.bodyWrapper.scrollTop = 0;
      //启动loading
      this.tableLoading = true;
      let paramsObj = {
        pageSize: this.paginationConfig.pageSize, //分页数量
        pageNum: this.paginationConfig.currentPage, //页数
      };
      let paramsForm = form;
      //分页参数 表单参数 自定义参数结合
      let parmas = {
        ...paramsObj,
        ...paramsForm,
        ...this.basicTableOptions.apiParams,
      };
      parmas = this.formDataParams(parmas);

      //调用查询table接口
      this.basicTableOptions.api({ ...parmas }).then((res) => {
        if (!this.basicTableOptions.apiFormat) {
          console.error("缺少apiFormat");
          return;
        }
        let data = res;
        this.$emit("update:basicTableData", res); //同步给与父组件table
        this.$emit("queryBasicTable", parmas, res); // 查询返回参数与返回的整个查询的结果
        this.paginationConfig.total = res;
        let formatdata = this.basicTableOptions.apiFormat.split("."); // table 数据格式
        let paginationFormat = this.basicTableOptions.paginationFormat.split(
          "."
        ); // 分页总数table 格式
        for (let i = 0; i < formatdata.length; i++) {
          data = data[formatdata[i]];
        }
        for (let i = 0; i < paginationFormat.length; i++) {
          this.paginationConfig.total = this.paginationConfig.total[
            paginationFormat[i]
          ];
        }
        this.tableData = data;
        this.tableLoading = false;
      });
    },
    // 重置
    handleFormReset(form) {
      this.$emit("resetForm", form);
      this.$nextTick(() => {
        this.handleQuery(form);
      });
    },
    /**
     * 改变Form 显示隐藏
     **/
    changeFormVisible() {
      this.formVisible = !this.formVisible;
      if (this.$refs.form) {
        if (this.formVisible) {
          for (let i = 3; i < this.$refs.form.$children.length; i++) {
            this.$refs.form.$children[i].$el.style = "display:none";
          }
        } else {
          for (let i = 3; i < this.$refs.form.$children.length; i++) {
            this.$refs.form.$children[i].$el.style = "display:block";
          }
        }
      }
    },
    // 刷新
    handleRefresh() {
      this.handleQuery();
      this.$emit("getTableData");
    },
    //每页 ${val} 条
    handleSizeChange(val) {
      this.paginationConfig.pageSize = val;
      this.paginationConfig.currentPage = 1;
      this.handleQuery();

      /**
       * 分页注释改版
       */
      // this.$emit("changePagination", this.paginationConfig);
    },

    //当前页: ${val}
    handleCurrentChange(val) {
      this.paginationConfig.currentPage = val;
      this.handleQuery(this.$refs.basicForm.form);
      /**
       * 分页注释改版
       */
      // this.$emit("changePagination", this.paginationConfig);
    },
    /**
     * @param row 行数据
     * @param index 索引
     * @param arr 数组
     */
    handleSwitch(row, index, arr) {
      this.$emit("changeSwitch", row, (res) => {
        if (res) {
          for (let i = 0; i < arr.length; i++) {
            if (row[index] !== arr[i].value) {
              setTimeout(() => {
                row[index] = arr[i].value;
              });
            }
          }
        }
      });
    },
    // 清空table
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    // 选中table
    toggleRowSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(this.tableData[row]);
        });
      }
    },

    // utils 参数 临时放置！！！！ 后期 移utils
    formDataParams(obj) {
      let params = {};
      for (let key in obj) {
        if (typeof obj[key] !== "number") {
          if (obj[key]) {
            params[key] = String(obj[key]).replace(/(^\s*)|(\s*$)/g, "");
          } else {
            params[key] = "";
          }
        } else {
          if (obj[key]) {
            params[key] = obj[key];
          }
        }
      }
      return params;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  td:hover {
    .el-icon-edit {
      display: inline-block !important;
    }
  }
  .el-icon-edit {
    position: absolute;
    right: 20px;
    top: 45%;
    display: none !important;
  }
  .edit {
    text-align: right;
    cursor: pointer;

    padding-left: 10px;
    display: inline-block;
  }
  .edit-input {
    width: 60%;
  }
  &__form {
    height: auto;
    /* overflow: hidden; */
    padding: 10px;
    background-color: #fff;
    &__content {
      height: auto;
      overflow: hidden;
    }

    .base-table__form-actions {
      .content {
        float: right;
      }
      height: auto;
      overflow: hidden;
    }
  }

  &-wrapper {
    flex: 1;
    margin-top: 16px;
    padding: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header__toolbar {
    float: right;
    span {
      font-weight: 500;
      cursor: pointer;
      font-size: 20px;
    }
  }

  &__tables {
    margin-top: 10px;
  }

  &__pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>

<style lang="scss">
.base-table__tables {
  th {
    color: #000;
    font-weight: 500;
    background-color: #fafafa;
  }

  td {
    color: rgba(0, 0, 0, 0.85) !important;
  }
}
</style>
