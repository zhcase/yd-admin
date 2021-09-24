<!--
 * @Author: zeHua
 * @Date: 2021-09-24 15:47:02
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-24 17:54:51
 * @FilePath: /yd-admin/src/components/Dialog/components/BasicDialog.vue
-->

<template>
  <el-dialog
    title="提示"
    v-on="$listeners"
    v-bind="$attrs"
    class="vdialog"
    ref="dialog"
    :v-dialogDrag="true"
    width="30%"
  >
    <div slot="title">hello</div>
    <slot> </slot>
  </el-dialog>
</template>

<script>
import '../hooks/utils.js';
export default {
  name: 'BasicDialog',
  data() {
    return {
      obj: {},
    };
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.el-dialog__header {
  border-bottom: 1px solid #dedede;
}
</style>
