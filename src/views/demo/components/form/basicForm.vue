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
        :formModel="formsss"
      >
      </BasicForm>
    </el-card>
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
      activeNames: '1',
      formsss: {},
      basicForm: [
        {
          component: 'Text',
          componentProps: {
            color: 'red',
            fontSize: '12px',
          },
          content: '<div>123232</div>',
        },
        {
          field: 'field1',
          colProps: {
            span: 12,
            formSpan: 18,
          },
          label: '字段1',
          componentProps: {
            onChange: (e) => {
              // console.log(1232);
              if (e) {
                this.basicForm[4].componentProps.options = [
                  { pageviews: 1, id: 2 },
                ];
              }
            },
          },
          component: 'Input',
          isShow: true,
          placeholder: '字段1',
        },

        {
          field: 'field2',
          label: '带后缀',
          component: 'Input',
          placeholder: '字段2',
          suffix: '天',
        },

        {
          field: 'field2',
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
          componentProps: {
            // api: getList(1),
            // apiFormat: 'data.items',
            optionsFormat: { label: 'id', value: 'pageviews' },
            options: [{ pageviews: 4, id: 4 }],
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
  mounted() {
    setTimeout(() => {
      this.$set(this.formsss, 'field1', 12323);
      this.formsss.field1 = '12323';
    }, 3000);
  },
  methods: {
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
