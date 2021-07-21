<template>
  <div class="base-table">
    <div class="base-table__form" v-if="formSchema.length > 0">
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
          <slot :name="item.slot" :schema="item" v-if="item.slot"></slot>
          <el-form-item :label="item.label" v-else>
            <FormMap :schema="item" />
          </el-form-item>
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
        height="100%"
        v-bind="basicTableOptions.basicTableProps"
        v-on="basicTableOptions.basicTableProps"
        border
        class="base-table__tables"
      >
        <template v-for="item of registerTable">
          <slot v-if="item.slot" :name="item.slot"> </slot>
          <el-table-column
            v-else
            :prop="item.value"
            header-align="center"
            align="center"
            :key="item.value"
            v-bind="item"
          >
            <!-- {item.attr} -->
            <template slot-scope="scope">
              <!-- 直接展示 -->
              <template v-if="!item.options">
                {{ scope.row[item.value] }}
              </template>
              <!-- 条件展示 -->
              <template>
                <template v-if="item.type === 'radio'">
                  <el-switch
                    :value="
                      handleFilterData(scope.row[item.value], item.options)
                    "
                    @change="handleSwitch(scope.row, item.value, item.options)"
                  >
                  </el-switch>
                </template>
                <template v-if="item.type !== 'radio' && item.options">
                  {{ handleFilterData(scope.row[item.value], item.options) }}
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
            :total="paginationConfig.total || 0"
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
      tableData: [],

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
    // tableData: {
    //   required: true,
    //   type: Array,
    //   default: [],
    // },
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
    this.handleQuery();
    this.changeFormVisible();
  },
  methods: {
    // 查询
    handleQuery() {
      let form = {};
      let t = "";
      console.log(this.$refs.formData);
      if (this.$refs.formData) {
        for (let i = 0; i < this.$refs.formData.length; i++) {
          t =
            this.$refs.formData[i].$children[0] &&
            this.$refs.formData[i].$children[0].$children[1];
          if (t && t.form) {
            if (Object.keys(t.form).length > 0) {
              form = {
                ...form,
                ...t.form,
              };
            } else {
              let formKeys = t.schema.field;
              form[formKeys] = "";
            }
          } else {
            if (t) {
              let formModel = t.$vnode.data.model;
              form[formModel.expression] = formModel.value;
            }
          }
        }
      }
      let paramsObj = {
        pageSize: this.paginationConfig.pageSize,
        pageNumber: this.paginationConfig.currentPage,
      };
      let paramsForm = this.formDataParams(form);
      let parmas = { ...paramsObj, ...paramsForm };
      this.basicTableOptions.api(parmas).then((res) => {
        this.tableData = res.data.items;
        this.paginationConfig.total = res.data.total;
      });
    },
    // 重置
    handleFormReset() {
      if (this.$refs.formData) {
        for (let i = 0; i < this.$refs.formData.length; i++) {
          let t = this.$refs.formData[i].$children[0].$children[1];
          if (t.form) {
            t.form = {};
          } else {
            this.$emit("resetForm");
          }
        }
      }
      this.$nextTick(() => {
        this.handleQuery();
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

      this.handleQuery();
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
    // utils 参数 临时放置！！！！ 后期 移utils
    formDataParams(obj) {
      let params = {};
      for (let key in obj) {
        params[key] = obj[key].replace(/(^\s*)|(\s*$)/g, "");

        // params+=obj
      }
      return params;
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
    background-color: #fafafa;
  }

  td {
    color: rgba(0, 0, 0, 0.85) !important;
  }
}
</style>

