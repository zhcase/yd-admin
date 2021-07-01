<template>
  <div class="base-table">
    <div class="base-table__form"></div>

    <div class="base-table__toolbar">
      <span class="base-table__toolbar__title">
        <template> 自定义内容</template>
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
      style="width: 100%"
      border
      class="base-table__tables"
    >
      <template v-for="item of registerTable">
        <slot v-if="item.slot" :name="item.slot"> </slot>
        <el-table-column
          v-else
          :prop="item.index"
          header-align="center"
          align="center"
          :label="item.title"
          :key="item.index"
          v-bind="item.attr"
        >
          <template slot-scope="scope">
            <!-- 直接展示 -->
            <template v-if="!item.options">
              {{ scope.row[item.index] }}
            </template>
            <!-- 条件展示 -->
            <template>
              <template v-if="item.type === 'radio'">
                <el-switch
                  :value="handleFilterData(scope.row[item.index], item.options)"
                  @change="handleSwitch(scope.row, item.index, item.options)"
                >
                </el-switch>
              </template>
              <template v-if="item.type !== 'radio' && item.options">
                {{ handleFilterData(scope.row[item.index], item.options) }}
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <template v-if="basicTableOptions.paginationProps">
      <div class="base-table__Pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationConfig.currentPage"
          :page-size="paginationConfig.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="basicTableOptions.paginationProps.total || 0"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  props: {
    tableData: {
      required: true,
      type: Array,
    },
    registerTable: {
      required: true,
      type: Array,
    },
    basicTableOptions: {
      required: false,
      type: Object,
    },
  },
  computed: {
    handleFilterData() {
      return (index, data) => {
        let result = data.filter((item) => {
          return item.value === index;
        });
        if (result && result[0]) {
          return result[0].label;
        }
        return;
      };
    },
  },
  watch: {
    basicTableOptions(val) {
      console.log(val);
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.basicTableOptions.paginationConfig) {
        this.paginationConfig = this.basicTableOptions.paginationConfig;
      }
    });
  },
  methods: {
    handleRefresh() {
      this.$emit("getTableData");
    },
    //每页 ${val} 条
    handleSizeChange(val) {
      this.paginationConfig.pageSize = val;
      this.$emit("changePagination", this.paginationConfig);
    },

    //当前页: ${val}
    handleCurrentChange(val) {
      this.paginationConfig.currentPage = val;
      this.$emit("changePagination", this.paginationConfig);
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
  },
};
</script>

<style lang='scss' scoped>
.base-table {
  &__toolbar {
    min-height: 40px;
    line-height: 40px;
  }
  &__header__toolbar {
    float: right;
    span {
      font-weight: 500;
      cursor: pointer;
      font-size: 20px;
    }
  }

  &__Pagination {
    margin: 20px 0;
    text-align: right;
    .el-table th > .cell {
    }
  }
}
</style>

<style lang='scss'>
.base-table__tables {
  th {
    color: #000;
    font-weight: 500;
  }
  td {
    color: rgba(0, 0, 0, 0.85) !important;
  }
}
</style>

