<!--
 * @Author: zeHua
 * @Date: 2021-07-01 11:47:50
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-19 17:07:44
 * @FilePath: /yd-admin/src/components/Form/components/FormMap.vue
-->
<script type="jsx">
import {TreeSelect} from '@/components/Tree/index.js'
export default {
  data() {
    return {
      form: "",
      componentProps: {
        field: "Input",
      },
    };
  },
  components:{
    TreeSelect
  },

  props: {
    schema: {},
    value: {
      default: () => {
        return undefined;
      },
    },
  },
  watch: {
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true,
    },
  },
  render() {
    // 创建组件 create开头+组件名 传递this.schema参数
    if (!this.schema.componentProps) {
      this.schema.componentProps = "";
    }
    this.$emit("update:value", this.form);
    return this["create" + this.schema.component](this.schema);
  },
  methods: {
      // 监听 onInput 事件进行赋值操作
    $_handleInput(e) {
      console.log(e);
      this.name = e.target.value
    },
    /**
     * @description 创建一个文本显示行 占位符
     * @param schema 数据model
     */
    createText(schema) {
      if (schema.defaultValue) {
        schema.content = schema.defaultValue;
      }
      if (typeof schema.content === "number") {
        schema.content = String(schema.content);
      }
      if(this.form){
        schema.content =this.form
      }

      return (
        <div
          domPropsInnerHTML={schema.content ? schema.content : "占位符"}
          style={
            schema.content
              ? schema.componentProps
              : { opacity: 0, ...schema.componentProps }
          }
        ></div>
      );
    },
    /**
     * @description 创建一个输入框组件
     * @param schema 数据model
     */
    createInput(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : (e) => {};
      if(onChange(this.form)){
        this.form=onChange(this.form);
      }
      return (
        <el-input
        style='height:40px'
          v-model={this.form}
          {...onChange(this.form)}

          {...attr}
          {...{ attrs: schema }}
        ></el-input>
      );
    },
    /**
     * @description 创建一个选择框组件
     * @param schema 数据model
     */
    createSelect(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      if (!attr.options) {
        console.error("Select  options未知");
        return;
      }
      return (
        <el-select
          v-model={this.form}
          {...onChange(this.form)}
          {...{ attrs: schema }}
           {...schema}

        >
          {attr.options.map((item) => (
            // 判断是否有格式化的值
            <el-option
              label={
                attr.optionsFormat ? item[attr.optionsFormat.label] : item.label
              }
              value={
                attr.optionsFormat ? item[attr.optionsFormat.value] : item.value
              }
            ></el-option>
          ))}
        </el-select>
      );
    },
    /**
     * @description 创建一个表单日日期组件
     * @param schema 数据model
     */
    createDateTimePicker(schema) {
      return this.createDatePicker(schema);
    },
    /**
     * @description 创建一个表单日日期组件
     * @param schema 数据model
     */
    createDatePicker(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      return (
        <el-date-picker
          type="daterange"
             {...schema}
          range-separator="至"
          v-model={this.form}
          {...onChange(this.form)}
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          {...{ attrs: schema }}
        ></el-date-picker>
      );
    },
    /**
     * @description 创建一个时间选择器组件
     * @param schema 数据model
     */
    createTimePicker(schema) {
      let attr = schema.componentProps;
      return (
        <el-time-select
          {...{ attrs: schema }}
          v-model={this.form}
        ></el-time-select>
      );
    },

    /**
     * @description 创建一个多选框
     * @param schema 数据Model
     */
    createCheckbox(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      if (!this.form) {
        this.form = [];
      }
      return (
        <el-checkbox-group
          v-model={this.form}
          {...{ attrs: schema }}
           {...schema}
          {...onChange(this.form)}
        >
          {attr.options.map((item, index) => (
            <el-checkbox
              key={index}
              {...{ attrs: item }}
              label={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </el-checkbox>
          ))}
        </el-checkbox-group>
      );
    },
    /**
     * @description 创建一个Switch 组件
     * @param schema 数据Model
     */
    createSwitch(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      return (
        <el-switch
          v-model={this.form}
          {...{ attrs: schema }}
           {...schema}
          {...onChange(this.form)}
        ></el-switch>
      );
    },
    /**
     * @description 创建一个Radio 组件
     * @param schema 数据Model
     */
    createRadio(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      if (!attr.options) {
        console.error("缺少options 参数");
        return;
      }
      return (
        <el-radio-group
          v-model={this.form}
          {...{ attrs: schema }}
           {...schema}
          {...onChange(this.form)}
        >
          {attr.options.map((item, index) => (
            <el-radio key={index} {...{ attrs: item }} label={item.value}>
              {item.label}
            </el-radio>
          ))}
        </el-radio-group>
      );
    },
    /**
     * @description 创建一个RadioButton 组件
     * @param schema 数据Model
     */
    createRadioButton(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      if (!attr.options) {
        console.error("缺少options 参数");
        return;
      }
      return (
        <el-radio-group
          v-model={this.form}
          {...{ attrs: schema }}
           {...schema}
          {...onChange(this.form)}
        >
          {attr.options.map((item, index) => (
            <el-radio-button
              key={index}
              {...{ attrs: item }}
              label={item.value}
            >
              {item.label}
            </el-radio-button>
          ))}
        </el-radio-group>
      );
    },
    /**
     * @description 创建一个数字输入框组件
     * @param schema 数据model
     */
    createInputNumber(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      return (
        <el-input-number
          v-model={this.form}
          {...onChange(this.form)}
          {...schema}

          {...{ attrs: schema }}
        ></el-input-number>
      );
    },
    /**
     * @description 创建一个级联选择器
     * @param schema 数据model
     */
    createCascader(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      return (
        <el-cascader
          v-model={this.form}
          options={attr.options}
          {...onChange(this.form)}
          {...schema}
          {...{ attrs: schema }}
        ></el-cascader>
      );
    },
    /**
     * @description 创建一个滑块
     * @param schema 数据model
     */
    createSlider(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      if (!this.form) {
        this.form = 0;
      }
      return (
        <el-slider
          v-model={this.form}
          {...onChange(this.form)}
          {...schema}
          {...{ attrs: schema }}
        ></el-slider>
      );
    },
    /**
     * @description 创建一个滑块
     * @param schema 数据model
     */
    createRate(schema) {
      let attr = schema.componentProps;
      let onChange = attr.onChange ? attr.onChange : () => {};
      if (!this.form) {
        this.form = 0;
      }
      return (
        <el-rate
          v-model={this.form}
          {...onChange(this.form)}
          {...schema}
          {...{ attrs: schema }}
        ></el-rate>
      );
    },
    createTreeSelect(){
        return (
          <tree-select>
          </tree-select>
        )
    }
  },
};
</script>
