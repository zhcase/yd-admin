<template>
  <div class="base-table">
    <div class="base-table__form">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        size="small"
        class="base-table__form__content"
      >
        <el-col
          :span="8"
          :xs="24"
          v-for="(item, index) of formSchema"
          :key="index"
          ref="formData"
        >
          <slot :name="item.slot" v-if="item.slot"></slot>
          <FormMap :schema="item" ref="" v-else />
        </el-col>
      </el-form>
      <div class="base-table__form-actions">
        <span class="content">
          <el-button size="small" @click="handleFormReset">重 置</el-button>
          <el-button type="primary" size="small" @click="handleQuery"
            >查 询</el-button
          >
          <el-button
            type="text"
            @click="changeFormVisible"
            v-if="$refs.form && $refs.form.$children.length > 3"
            >{{ formVisible ? "展开" : "收起" }}
            <i
              :class="{
                'el-icon-arrow-down': formVisible,
                'el-icon-arrow-up': !formVisible,
              }"
            ></i
          ></el-button>
        </span>
      </div>
    </div>

    <div class="base-table-wrapper">
      <div class="base-table__toolbar">
        <span class="base-table__toolbar__title">
          <slot name="toolbarLeft"> 自定义内容</slot>
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
        height="100%"
        :stripe="true"
        v-bind="basicTableOptions.basicTableProps"
        v-on="basicTableOptions.basicTableProps"
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
            :type="item.type"
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
        <div class="base-table__pagination">
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
  </div>
</template>

<script>
import FormMap from "./FormMap.vue";
export default {
  components: {
    FormMap,
  },
  data() {
    return {
      form: {},
      formVisible: false,
      // 分页
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  props: {
    // table 数据
    tableData: {
      required: true,
      type: Array,
      default: [],
    },
    // table 索引与title
    registerTable: {
      required: true,
      type: Array,
      default: [],
    },
    // table 配置
    basicTableOptions: {
      required: false,
      type: Object,
      default: {
        basicTableProps: {
          maxHeight: "450",
        },
      },
    },
    formSchema: {
      required: true,
      type: Array,
    },
  },

  computed: {
    /**
     * 过滤返回选中数据
     */
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
    console.log(this.formSchema);
    this.changeFormVisible();
    this.$nextTick(() => {
      if (this.basicTableOptions.paginationConfig) {
        this.paginationConfig = this.basicTableOptions.paginationConfig;
      }
    });
  },
  methods: {
    // 查询
    handleQuery() {
      let form = {};
      console.log(this.$refs.formData);
      for (let i = 0; i < this.$refs.formData.length; i++) {
        if (Object.keys(this.$refs.formData[i].form).length > 0) {
          form = { ...form, ...this.$refs.formData[i].form };
        } else {
          let formKeys = this.$refs.formData[i].schema.field;
          form[formKeys] = "";
        }
      }
      console.log(this.$refs.formData);
    },
    // 重置
    handleFormReset() {
      console.log(this.$refs.formData[0].form);
      for (let i = 0; i < this.$refs.formData.length; i++) {
        this.$refs.formData[i].form = {};
      }
    },
    /**
     * 改变Form 显示隐藏
     **/
    changeFormVisible() {
      // console.log(this.$refs.form.$children[3].$el);
      this.formVisible = !this.formVisible;
      if (this.formVisible) {
        for (let i = 3; i < this.$refs.form.$children.length; i++) {
          this.$refs.form.$children[i].$el.style = "display:none";
        }
      } else {
        for (let i = 3; i < this.$refs.form.$children.length; i++) {
          this.$refs.form.$children[i].$el.style = "display:block";
        }
      }
    },
    // 刷新
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
  height: 100%;
  display: flex;
  flex-direction: column;
  &__form {
    height: auto;
    overflow: hidden;
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

<style lang='scss'>
.base-table__tables {
  th {
    color: #000;
    font-weight: 500;
    background-color: #FAFAFA;
  }

  td {
    color: rgba(0, 0, 0, 0.85) !important;
  }
}
</style>

