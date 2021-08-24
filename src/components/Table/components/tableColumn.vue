<template>
  <el-table-column
    :prop="item.value"
    header-align="center"
    align="center"
    class="table-hover"
    v-bind="item"
  >
    <template v-if="item.children">
      <template v-for="(item, index) of item.children">
        <TableColumn :item="item" :key="index"></TableColumn>
      </template>
    </template>
    <!-- {item.attr} -->
    <template slot-scope="scope">
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

        <!-- <template> -->
        {{
          scope.row[scope.$index] &&
          scope.row[scope.$index][scope.column.property]
            ? ""
            : scope.row[item.value]
        }}
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
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "TableColumn",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
};
</script>