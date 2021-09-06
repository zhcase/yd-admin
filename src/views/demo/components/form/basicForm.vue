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
        :formModel="form"
      >
        <template #slot1>
          <el-form-item style="opacity: 0">1</el-form-item>
        </template>
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
      form: {},
      basicForm: [
        {
          field: 'field1',
          label: '字段1',
          componentProps: {},
          component: 'Input',
          placeholder: '字段1',
        },
        {
          isShow: false,
        },
        {
          slot: 'slot1',
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
            api: getList(1),
            apiFormat: 'data.items',
            optionsFormat: { label: 'id', value: 'pageviews' },
            options: [],
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
      this.form = {
        field1: '12323',
        field2: '23232323',
        field3: '23232323',
      };
    }, 2000);
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
