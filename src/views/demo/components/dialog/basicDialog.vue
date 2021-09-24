<!--
 * @Author: zeHua
 * @Date: 2021-09-24 16:04:26
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-24 16:54:25
 * @FilePath: /yd-admin/src/views/demo/components/dialog/basicDialog.vue
-->
<template>
  <div>
    <el-button type="primary" @click="handleClick">弹出</el-button>
    <BasicDialog :visible.sync="dialogVisible">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </BasicDialog>
  </div>
</template>
<script>
import { BasicDialog } from '@/components/Dialog/index';

export default {
  components: {
    BasicDialog,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClick() {
      this.dialogVisible = true;
    },
  },
};
</script>
