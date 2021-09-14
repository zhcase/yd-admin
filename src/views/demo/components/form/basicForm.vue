<template>
  <div class="basic-form">
    <div class="title">
      <h1>基础表单</h1>
    </div>
    <el-card class="box-card" shadow="never">
      <BasicForm
        :schema="basicForm"
        @handleSubmit="handleSubmit"
        :span="8"
        :formModel.sync="formModel"
        :schemaAttr.sync="schemaAttr"
      >
      </BasicForm>
    </el-card>
    <el-button type="primary" @click="handleClick">获取值</el-button>
  </div>
</template>

<script>
import BasicForm from '@/components/Form/components/BasicForm.vue';
import { getList } from '@/api/table';

export default {
  components: {
    BasicForm,
  },
  data() {
    return {
      formModel: {},
      schemaAttr: {},
      activeNames: '1',
      formsss: {},
      basicForm: [
        {
          field: 'field1',
          defaultValue: 'hihihi',
          colProps: {
            // span: 12,
            // formSpan: 18,
          },
          label: '字段1',
          componentProps: {
            onChange: (e) => {
              // console.log(1232);
              // if (e) {
              //   this.basicForm[4].componentProps.options = [
              //     { pageviews: 1, id: 2 },
              //   ];
              // }
            },
          },
          component: 'Input',
          placeholder: '字段1',
        },
        {
          field: 'field22',
          component: 'Text',
          content: '2323',
          componentProps: {
            fontSize: '24px',
          },
        },

        {
          field: 'field2',
          label: '带后缀',
          component: 'Input',
          placeholder: '字段2',
          defaultValue: 22,
          suffix: '天',
        },

        {
          field: 'field3',
          label: '字段3',
          component: 'DatePicker',
          placeholder: '请选择',
          type: 'date',
        },
        {
          field: 'field4',
          label: '字段4',
          component: 'Select',
          placeholder: '请选择',
          clearable: true,
          defaultValue: 3,

          // defaultValue: 4,
          componentProps: {
            // api: getList(1),
            // apiFormat: 'data.items',
            // optionsFormat: { label: 'label', value: 'value' },
            options: [{ label: 'hello', value: 3 }],
            // options: [
            //   {
            //     label: "hello",
            //     value: 1,
            //   },
            //   {
            //     label: "hello2",
            //     value: 2,
            //   },
            // ],
            onChange: (e) => {
              console.log(e);
            },
          },
        },
        {
          field: 'field5',
          label: '字段5',
          component: 'Checkbox',
          componentProps: {
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ],
          },
        },
        {
          field: 'field6',
          label: '字段6',
          component: 'Radio',

          componentProps: {
            onChange: (e) => {
              if (e === 1) {
                this.$nextTick(() => {
                  this.$set(this.formModel, 'field22', 'hellowolrd');
                });
              }
            },
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ],
          },
        },
        {
          field: 'field7',
          label: '字段7',
          component: 'Switch',
        },
        {
          field: 'field8',
          label: '字段8',
          component: 'RadioButton',
          componentProps: {
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ],
          },
        },
        {
          field: 'field9',
          label: '字段7',
          marks: {
            0: '0°C',
            8: '8°C',
            37: '37°C',
            50: {
              style: {
                color: '#1989FA',
              },
              label: this.$createElement('strong', '50%'),
            },
          },
          component: 'Slider',
        },
        {
          field: 'field10',
          label: '字段7',
          component: 'Rate',
        },
      ],
    };
  },
  created() {
    // this.formModel.field1 = 'hello';
    // console.log(this.formModel);
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$set(this.formModel, 'field1', '');
        this.$set(this.formModel, 'field4', '');
        console.log(this.formModel);
      }, 3000);
      this.schemaAttr.field1.isHidden = true;
    });
  },
  methods: {
    handleClick(e) {
      console.log(this.formModel);
    },
    handleSubmit(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-form {
  .title {
    background-color: #fff;
    padding: 20px;
  }
  .box-card {
    margin-top: 20px;
  }
}
</style>
