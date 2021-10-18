<!--
 * @Author: zeHua
 * @Date: 2021-09-17 09:39:39
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-12 17:04:16
 * @FilePath: /yd-admin/src/components/Tree/components/TreeSelect.vue
-->
<template>
  <div class="tree-select">
    <el-select
      v-model="treeValue"
      :multiple="multiple"
      collapse-tags
      @clear="handleSelectClear"
      :clearable="true"
      :style="{ width: width }"
      @remove-tag="selectRemoveTag"
      placeholder="请选择"
      :popper-append-to-body="false"
    >
      <el-option v-model="treeDataValue" class="tree-select__options">
        <div v-show="data[0]">
          <el-tree
            v-on="$listeners"
            v-bind="$attrs"
            :data="treeData"
            :props="props"
            @node-click="handleNodeClick"
            :show-checkbox="multiple"
            filterCheck="userId"
            ref="tree"
            @check="getHalfCheckedNodes"
          >
          </el-tree>
        </div>
      </el-option>
      <el-option
        v-for="(item, index) of treeOptionsArray"
        :key="index"
        v-show="false"
        :value="item[props.value]"
        :label="item[props.label]"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { handleTree } from "../utils.js";
export default {
  name: "basicTree",
  data() {
    return {
      method: null,
      treeValue: [], // tree选中的value 值
      treeData: [], //构建 tree的数组
      treeDataValue: "", // 暂时未用
      treeOptionsArray: [], // 生成虚拟options 对应select 做展示
    };
  },
  props: {
    filterCheck: {
      type: String,
    },
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    props: {
      type: Object,
    },
    refs: {
      required: false,
      type: String,
    },
    data: {
      // 构建 Tree 数据
      type: Array,
      default: () => {
        return [];
      },
    },
    multiple: {
      //是否开启多选
      type: Boolean,
      default: () => {
        return false;
      },
    },
    format: {
      type: Array,
    },
  },
  watch: {
    treeValue: {
      handler(val) {
        this.getPropsTreeKeys();
      },
    },
  },
  mounted() {
    this.method = this.$refs.tree;
    this.handleFormat();
    // setTimeout(() => {

    // }, 500);
  },
  methods: {
    // 清空TreeValue的值
    clearTreeValue() {
      this.treeValue = [];
      this.handleSelectClear();
    },
    /**
     * 判断是否select清空 清空时 同时清空Tree的value
     */
    handleSelectClear() {
      console.log(this.treeValue);
      if(!this.treeValue){
              this.$refs.tree.setCheckedKeys([]);
        return;
      }
      this.$refs.tree.setCheckedKeys(this.treeValue);
    },
    /**
     * 判断是否要格式化Tree
     */
    handleFormat() {
      if (this.format) {
        this.treeData = handleTree(this.data, ...this.format);
      } else {
        this.treeData = this.data;
      }
      // 模拟树形结构  初始化默认选中 选中对象
      this.$nextTick(() => {
        let TreeCheckoutObj = {
          checkedKeys: this.$refs.tree.getCheckedKeys(),
          checkedNodes: this.$refs.tree.getCheckedNodes(),
        };
        //判断是否多选 多选走多选的逻辑
        if (this.multiple) {
          this.getHalfCheckedNodes("", TreeCheckoutObj);
        } else {
          console.log(TreeCheckoutObj);
          for (let i = 0; i < TreeCheckoutObj.checkedNodes.length; i++) {
            if (
              TreeCheckoutObj.checkedNodes[i].id ===
              TreeCheckoutObj.checkedKeys[0]
            ) {
              this.handleNodeClick(TreeCheckoutObj.checkedNodes[i]);
            }
          }
        }
      });
    },
    /**
     * 多选的时候移除的时候同步treeselect
     * @param val 移除的id
     */
    selectRemoveTag(val) {
      this.$refs.tree.setCheckedKeys(this.treeValue);
    },
    /**
     * checkbox 勾选值
     * @param val 当前勾选的值
     * @param  data 当前选中的Key 与选中的节点 吧
     */
    getHalfCheckedNodes(val, data) {
      console.log(val);
      this.treeOptionsArray = [];
      //判断是否多选 赋值v-model类型
      if (this.multiple) {
        this.treeValue = [];
      } else {
        this.treeValue = "";
      }
      console.log(val);
      console.log(data);
      let checkedNodes = data.checkedNodes.filter((item) => {
        if (item.userId) {
          return item;
        }
      });

      this.treeOptionsArray = data.checkedNodes;
      console.log(checkedNodes);
      this.$nextTick(() => {
        if (this.multiple) {
          this.treeValue = data.checkedKeys;
        } else {
          this.treeValue = data.checkedKeys.join();
        }
      });
    },
    /**
     * 当不是多选的时候 点击的时候赋值
     * @param 当选的值
     */
    handleNodeClick(data) {
      console.log(data);
      if (!this.multiple) {
        this.treeOptionsArray = [];
        this.treeOptionsArray.push(data);
        this.treeValue = data[this.props.value];
      }
    },
    /**
     * 传出Tree的值
     *
     */
    getPropsTreeKeys() {
      this.$emit("getTreeValue", this.treeValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-select {
  &__options {
    height: auto;
    background-color: #fff;
  }
  &__options:hover {
    background-color: #fff;
  }
}
</style>
