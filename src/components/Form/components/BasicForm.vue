<template>
  <div class="antd-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item
        :label="item.label"
        v-for="(item, index) in schema"
        :prop="item.field"
        :key="index"
      >
        <FormMap
          :schema="item"
          ref="formData"
          v-model="item.field"
          @handleChange="handleChange"
        />
      </el-form-item>
      <el-button type="primay" @click="handleSubmit">232323</el-button>
      <el-button type="primay" @click="rest">232323</el-button>
    </el-form>
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
      rules: {},
    };
  },
  props: {
    schema: {},
  },

  methods: {
    // form 表单改变
    handleChange(val, key) {
      this.$set(this.form, key, val[key]);
    },
    /** 重置 */
    rest() {
      for (let i = 0; i < this.$refs.formData.length; i++) {
        this.$refs.formData[i].form = {};
      }
    },
    /** 提交 */
    handleSubmit() {
      let parmas = {};
      for (let i = 0; i < this.$refs.formData.length; i++) {
        parmas = { ...parmas, ...this.$refs.formData[i].form };
      }
      console.log(parmas);
    },
  },
  mounted() {
    console.log(this.rules);
    console.log(this.schema.length);
    for (let i = 0; i < this.schema.length; i++) {
      this.$set(this.rules, this.schema[i].field, this.schema[i].rules);
      this.form[this.schema[i].field] = this.schema[i].defaultValue;
    }
    console.log(this.rules);
  },
};
</script>
<style lang='scss' scoped>
</style>