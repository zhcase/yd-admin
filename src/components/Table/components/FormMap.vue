<script type='jsx'>
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
    // console.log(this.schema);

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
    // 输入框
    createInput(schema) {
      let attr = schema.componentProps;

      // setTimeout(() => {
      //   if (schema.defaultValue) {
      //     this.form[schema.field] = schema.defaultValue;
      //   }
      // }, 300);
      return (
        <el-form-item label={schema.label}>
          <el-input
            v-model={this.form[schema.field]}
            value={schema.defaultValue}
            {...{ attrs: attr }}
          ></el-input>
        </el-form-item>
      );
    },
    // select
    createSelect(schema) {
      let attr = schema.componentProps;

      return (
        <el-form-item label={schema.label}>
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
        </el-form-item>
      );
    },
    createDaterange(schema) {
      let attr = schema.componentProps;
      return (
        <el-form-item label={schema.label}>
          <el-date-picker
            type="daterange"
            range-separator="至"
            v-model={this.form[schema.field]}
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      );
    },
  },
};
</script>