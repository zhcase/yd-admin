<!--
 * @Author: zeHua
 * @Date: 2021-07-23 09:40:07
 * @LastEditors: zeHua
 * @LastEditTime: 2021-07-23 09:45:43
 * @FilePath: /yd-admin/src/views/life/children.vue
-->
<template>
  <div></div>
</template>

<script>
export default {
  beforeCreate() {
    console.log("-----子组件beforeCreate----");
  },
  created() {
    console.log("-----子组件created----");
  },
  beforeMount() {
    console.log("-----子组件beforeMount----");
  },
  mounted() {
    console.log("-----子组件mounted----");
  },
  beforeDestroy() {
    console.log("-----子组件beforeDestroy----");
  },
  destroyed() {
    console.log("-----子组件destroyed----");
  },
};
</script>