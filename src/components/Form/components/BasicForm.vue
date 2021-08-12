<template>
  <div class="antd-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      :label-width="labelWidth + 'px'"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <el-col :span="8" :key="index" :xs="24" v-for="(item, index) in schema">
        <slot :name="item.slot" v-if="item.slot" :field="item.field"> </slot>
        <el-form-item :label="item.label" :prop="item.field" v-if="!item.slot">
          <template>
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
    </div>
  </div>
</template>
<script>
import FormMap from "./FormMap.vue";
import { refactorFormData } from "./formUtils.js";
export default {
  components: {
    FormMap,
  },
  data() {
    return {
      form: {},
      rules: {},
      isHiddeForm: false,
      formVisible: false,
    };
  },
  props: {
    schema: {},
    labelWidth: {
      type: Number,
      default: () => {
        return 150;
      },
    },
  },

  methods: {
    // form 表单改变
    handleChange(val, key) {
      this.$set(this.form, key, val[key]);
    },
    /** 重置 */
    reset() {
      for (let i = 0; i < this.$refs.formData.length; i++) {
        console.log(this.$refs.formData[i]);
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
        if (this.$slots[slotArray[i]]) {
          for (let t = 0; t < this.$slots[slotArray[i]].length; t++) {
            // 循环判断是否用children 还是外层的 如果有children 说明目前是table 外层套了children  看后期有时间做次修改!!!
            if (this.$slots[slotArray[i]][t].componentOptions.children) {
              parmas[
                this.$slots[slotArray[i]][
                  t
                ].componentOptions.children[0].data.model.expression
              ] =
                this.$slots[slotArray[i]][
                  t
                ].componentOptions.children[0].data.model.value;
            } else {
              parmas[this.$slots[slotArray[i]][t].data.model.expression] =
                this.$slots[slotArray[i]][t].data.model.value;
            }
          }
        }
      }
    },
    // 设置form表单的value
    formValue() {
      console.log(this.form);
      for (let i = 0; i < this.schema.length; i++) {
        this.$set(this.rules, this.schema[i].field, this.schema[i].rules);
        this.$set(this.form, this.schema[i].field, this.schema[i].defaultValue);
      }
      this.$refs["form"].validate();
    },
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
  },
  created() {},
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
    /* height: 60px; */
    width: 100%;
    text-align: right;
  }
}
</style>