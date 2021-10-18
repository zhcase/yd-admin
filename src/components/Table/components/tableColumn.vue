<!--
 * @Author: zeHua
 * @Date: 2021-08-23 14:22:12
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-28 16:59:46
 * @FilePath: /yd-admin/src/components/Table/components/tableColumn.vue
-->
<template>
  <el-table-column
    :prop="item.value"
    header-align="center"
    align="center"
    class="table-hover"
    v-bind="item"
  >
    <!-- 递归合并table 头 -->
    <template v-if="item.children">
      <template v-for="(item, index) of item.children">
        <TableColumn
          :item="item"
          :key="index"
          @updateTableData="updateTableDataChildren"
        ></TableColumn>
      </template>
    </template>
    <!-- {item.attr} -->
    <template slot-scope="scope">
      <!-- {{ formmater(item.formater) }} -->
      <!-- 直接展示 -->
      <template v-if="!item.options">
        <el-input
          size="mini"
          @blur="tableInputBlur(scope.$index, scope.row, scope)"
          v-if="
            scope.row[scope.$index] &&
              scope.row[scope.$index][scope.column.property]
          "
          v-model="scope.row[item.value]"
          class="edit-input"
        ></el-input>
        <!-- 判断是否需要格式化  -->
        <!-- 需要 -->
        <template v-if="item.formatter">
          <span :style="item.style">
            {{
              formatter(
                item.formatter,
                scope.row[scope.$index] &&
                  scope.row[scope.$index][scope.column.property]
                  ? ''
                  : scope.row[item.value],
                scope.row,
                scope
              )
            }}
          </span>
        </template>
        <!-- 不需要直接展示 -->
        <template v-else>
          <span :style="item.style">
            {{
              scope.row[scope.$index] &&
              scope.row[scope.$index][scope.column.property]
                ? ''
                : scope.row[item.value]
            }}
          </span>
        </template>
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          v-if="item.tips"
          :content="item.tips"
        >
          <span
            class="el-icon-warning"
            style="margin-left: 5px"
            slot="reference"
          ></span>
        </el-popover>

        <!-- </template> -->
        <!-- 修改按钮 -->

        <span
          class="edit el-icon-edit"
          v-if="
            item.edit &&
              !(
                scope.row[scope.$index] &&
                scope.row[scope.$index][scope.column.property]
              )
          "
          @click="handleEdit(scope.$index, scope)"
        ></span>
        <!-- 取消按钮 -->
        <span
          class="edit cancel-btn el-icon-close"
          @click="handleCancelEdit($event, scope.$index, scope)"
          v-if="
            scope.row[scope.$index] &&
              scope.row[scope.$index][scope.column.property]
          "
        ></span>
        <!-- 确定按钮 -->
        <span
          class="edit cancel-btn el-icon-check"
          @mousemove.native="handleStopFoucs"
          @click.stop="handleConfirm($event, scope.$index, scope)"
          v-if="
            scope.row[scope.$index] &&
              scope.row[scope.$index][scope.column.property]
          "
        ></span>
      </template>
      <!-- 条件展示 -->
      <!-- <template>
        <template v-if="item.type === 'radio'">
          <el-switch
            :value="handleFilterData(scope.row[item.value], item.options)"
            @change="handleSwitch(scope.row, item.value, item.options)"
          >
          </el-switch>
        </template>
        <template v-if="item.type !== 'radio' && item.options">
          {{ handleFilterData(scope.row[item.value], item.options) }}
        </template>
      </template> -->
      <template v-if="item.type !== 'radio' && item.options">
        {{ handleFilterData(scope.row[item.value], item.options) }}
      </template>
    </template>
    <!-- </template> -->
  </el-table-column>
</template>
<script>
export default {
  name: 'TableColumn',
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    //表单数据
    // tableData: {
    //   type: Array,
    //   default: [],
    // },
  },
  computed: {
    /**
     * 格式化数据
     * @param fn 传递函数
     * @param args 传递的值
     */
    // formatter() {
    //   return async (fn, args) => {
    //     if (typeof fn === 'function') {
    //       let result = fn(args);
    //       this.$nextTick(() => {
    //         setTimeout(() => {
    //           console.log(result);
    //           return result;
    //         }, 5000);
    //       });
    //     }
    //   };
    // },
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
  watch: {},

  methods: {
    // 递归触发更新table
    updateTableDataChildren() {
      this.$emit('updateTableData');
    },
    /**
     * 格式化数据
     * @param fn 传递函数
     * @param args 传递的值
     */
    formatter(fn, args, cloumns, scoped) {
      if (typeof fn === 'function') {
        // console.log(fn(args));
        // console.log(cloumns);
        // this.$set(cloumns, 'author', new Date());
        // cloumns.author = new Date();
        // args = fn(args);
        return fn(args, cloumns, scoped);
      }
    },
    /**
     * 点击修改单元格
     * @param index 索引
     * @param scoped 整行数据
     */
    handleEdit(index, scoped) {
      scoped.row[index] = {};
      scoped.row[index][scoped.column.property] = true;
      scoped.row[index].content = scoped.row[scoped.column.property];
      this.$emit('updateTableData');
    },
    /**
     * @description 监听输入框是否失去焦点
     * @param index 索引
     * @param row  行的数据
     * @param scoped table 属性值
     */
    tableInputBlur(index, row, scoped) {
      let params = {
        scoped,
        index,
      };
      scoped.row[index][scoped.column.label] = false;
      // scoped.row[scoped.column.property] = scoped.row[index].content;
      this.$emit('updateTableData');
      this.$emit('handleTableCellEdit', params);
    },
    /**
     * 修改确认
     * @param e 默认事件
     * @param index 索引
     * @param scoped 整行数据
     */
    handleConfirm(e, index, scoped) {
      e.preventDefault();
      let params = {
        scoped,
        index,
      };
      console.log(scoped);
      scoped.row[index][scoped.column.property] = false;
      this.$emit('updateTableData');
      this.$emit('handleTableCellEdit', params);
      console.log(params);
    },
    /**
     * @description 取消输入框
     * @param e 默认事件
     * @param index 索引
     * @param scoped 整行数据
     */
    handleCancelEdit(e, index, scoped) {
      scoped.row[index][scoped.column.property] = false;
      scoped.row[scoped.column.property] = scoped.row[index].content;
      this.$emit('updateTableData');
    },
    /**
     * @description 取消输入框
     * @param e 默认事件
     * @param index 索引
     * @param scoped 整行数据
     */
    handleCancelEdit(e, index, scoped) {
      scoped.row[index][scoped.column.property] = false;
      scoped.row[scoped.column.property] = scoped.row[index].content;
      this.$emit('updateTableData');
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
