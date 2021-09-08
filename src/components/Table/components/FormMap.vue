<!--
 * @Author: zeHua
 * @Date: 2021-07-01 11:47:50
 * @LastEditors: zeHua
 * @LastEditTime: 2021-07-23 09:19:58
 * @FilePath: /yd-admin/src/components/Table/components/FormMap.vue
-->
<script type="jsx">
export default {
  data() {
    return {
      form: {},
      componentProps: {
        field: "Input",
      },
    };
  },
  props: {
    schema: {},
  },
  render() {
    if (this.schema.component === "Input") {
      return this.createInput(this.schema);
    } else if (this.schema.component === "Select") {
      return this.createSelect(this.schema);
    } else if (this.schema.component === "Daterange") {
      return this.createDaterange(this.schema);
    }
  },
  mounted() {
    if (this.componentProps.field === "Input") {
      return <Input />;
    }
  },
  methods: {
    /**
     * @description 创建一个输入框组件
     * @param schema 数据model
     */
    createInput(schema) {
      let attr = schema.componentProps;
      return (
        <el-input
          v-model={this.form[schema.field]}
          value={schema.defaultValue}
          {...{ attrs: attr }}
        ></el-input>
      );
    },
    /**
     * @description 创建一个选择框组件
     * @param schema 数据model
     */
    createSelect(schema) {
      let attr = schema.componentProps;
      return (
        <el-select
          v-model={this.form[schema.field]}
          {...{ attrs: attr }}
          label=""
          style="width:100%"
        >
          {attr.options.map((item) => (
            <el-option
              label={item.label}
              value={item.value}
              key={item.value}
            ></el-option>
          ))}
        </el-select>
      );
    },
    /**
     * @description 创建一个表单日日期组件
     * @param schema 数据model
     */
    createDaterange(schema) {
      let attr = schema.componentProps;
      return (
        <el-date-picker
          type="daterange"
          range-separator="至"
          v-model={this.form[schema.field]}
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      );
    },
  },
};
</script>
