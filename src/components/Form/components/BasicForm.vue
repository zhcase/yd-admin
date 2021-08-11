<template>
  <div class="antd-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="150px"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <el-col :span="8" :key="index" :xs="24" v-for="(item, index) in schema">
        <el-form-item :label="item.label" :prop="item.field">
          <slot :name="item.slot" v-if="item.slot" :field="item.field"> </slot>
          <template v-if="!item.slot">
            <FormMap
              :schema="item"
              ref="formData"
              v-model="item.field"
              @handleChange="handleChange"
            />
          </template>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="antd-form__footer">
      <el-button @click="reset('form')" size="small">重 置</el-button>
      <el-button type="primary" @click="handleSubmit" size="small"
        >提 交</el-button
      >
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
    reset() {
      for (let i = 0; i < this.$refs.formData.length; i++) {
        this.$refs.formData[i].form = {};
      }
      this.formValue();
    },
    /** 提交 */
    handleSubmit() {
      let parmas = {};
      for (let i = 0; i < this.$refs.formData.length; i++) {
        parmas = { ...parmas, ...this.$refs.formData[i].form };
      }
      // for()
      let slotArray = Object.keys(this.$slots);
      //循环所有slot key
      for (let i = 0; i < slotArray.length; i++) {
        for (let t = 0; t < this.$slots[slotArray[i]].length; t++) {
          parmas[this.$slots[slotArray[i]][t].data.model.expression] =
            this.$slots[slotArray[i]][t].data.model.value;
        }
      }
      console.log(slotArray);
      console.log(parmas);
    },
    formValue() {
      console.log(this.form);
      for (let i = 0; i < this.schema.length; i++) {
        this.$set(this.rules, this.schema[i].field, this.schema[i].rules);
        this.$set(this.form, this.schema[i].field, this.schema[i].defaultValue);
      }
      this.$refs["form"].validate();
    },
  },
  mounted() {
    this.formValue();
  },
};
</script>
<style lang='scss' scoped>
.antd-form {
  form {
    overflow: hidden;
  }
  &__footer {
    height: 60px;
    width: 100%;
    text-align: right;
  }
}
</style>