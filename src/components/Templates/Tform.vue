<script lang="ts" setup>
import { reactive, ref, defineExpose, defineEmits } from 'vue'
import Tselect from '@/components/Templates/Tselect.vue'
import Tradio from '@/components/Templates/Tradio.vue'
import dayjs, { Dayjs } from 'dayjs';

const labelCol = {
  style: { width: '100px' }
}
// const wrapperCol = {
//   xs: { span: 24 },
//   sm: { span: 12 }
// }
const props = defineProps({
  ruleForm: {
    type: Object,
    required: true
  },
  listInput: {
    type: Array,
    required: true
  },
  inline: {
    type: Boolean,
    default: false
  },
  btn_hide: {
    type: Boolean,
    default: false
  },
  label_width: {
    type: String,
    default: '80px'
  },
  loading: {
    type: Boolean,
    default: false
  },
  querytext: {
    type: String,
    default: '查询'
  },
  hidden_refresh: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'horizontal'
  }
})
//form提交
const emit = defineEmits(['submit', 'resetForm'])
const formRef = ref()
//keys 不同的查询条件
const submitForm = async (keys) => {
  if (!formRef) return
  await formRef.value?.validate()
  emit('submit', 'form', keys)
}
//清空
const resetForm = () => {
  console.log(formRef.value)

  if (!formRef.value) return
  formRef.value?.resetFields()
  //   props.listInput.map((item) => {
  //     if (item.hasOwnProperty('_prop')) {
  //       item._prop.forEach((keys) => {
  //         props.ruleForm[keys] = ''
  //       })
  //     }
  //   })
  //   emit('resetForm', 'resetForm')
}
//date-picker处理
const SetDatePacker = (e, key: Array) => {
  if (!e) e = ['', '']
  key.forEach((keys, i) => {
    props.ruleForm[keys] = e[i]
  })
}
// const disabledDate = (time: number, disabledDate: String) => {
//   console.log(time);
  
//   return time < new Date(disabledDate) || time.getTime() > Date.now()
// }

const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const selectChange = (v, item) => {
  emit('selectChange', v, item)
}
const radioChange = (v, item) => {
  console.log(v, item)

  // emit('selectChange',v,item)
}

defineExpose({
  submitForm,
  resetForm
})
</script>

<template>
  <a-form
    ref="formRef"
    :model="ruleForm"
    :layout="props.layout"
    :label-col="labelCol"
    class="demo-ruleForm"
  >
    <template v-for="item in listInput">
      <template v-if="item.type !== 'custom'">
        <a-form-item v-if="!item.isHide" :label="item.label" :name="item.prop" :rules="item.rules || null">
          <a-input
            v-if="item.type == 'input'"
            :disabled="item.disabled"
            v-model:value="ruleForm[item.prop]"
            :placeholder="item.placeholder || '请输入' + item.label"
            allow-clear
          />
          <a-input
            v-if="item.type == 'textarea'"
            :style="item.width"
            :type="item.type"
            :maxlength="item.length > 0 ? item.length : 50"
            show-word-limit
            autosize
            :disabled="item.disabled"
            v-model:value="ruleForm[item.prop]"
            :placeholder="item.placeholder || '请输入' + item.label"
            allow-clear
          />
          <!-- <a-date-picker
            v-else-if="item.type == 'time'"
            v-model:value="ruleForm[item.prop]"
            :picker="item._type"
            :placeholder="item.placeholder[0]"
            :valueFormat="item.format ?? 'YYYYMMDD'"
            @change="(date) => SetDatePacker(date, item._prop)"
            @clear="SetDatePacker(null, item._prop)"
            :disabled-date="(time) => disabledDate(time, item.disabledDate ?? '')"
          /> -->
          <a-range-picker
            v-else-if="item.type == 'time'"
            v-model:value="ruleForm[item.prop]"
            :picker="item._type"
            :placeholder="item.placeholder"
            :valueFormat="item.format ?? 'YYYYMMDD'"
            @change="(date) => SetDatePacker(date, item._prop)"
            @clear="SetDatePacker(null, item._prop)"
            :disabled-date="(time) => disabledDate(time, item.disabledDate ?? '')"
          />
          <Tselect
            v-else-if="item.type == 'select'"
            :ruleForm="ruleForm"
            :listInput="item"
            @selectChange="selectChange"
          />
          <Tradio v-else-if="item.type == 'radio'" :ruleForm="ruleForm" :listInput="item" @selectChange="radioChange" />

          <template v-else-if="item.type === 'slot'">
            <slot :name="item.name" :scope="item"></slot>
          </template>
        </a-form-item>
      </template>
      <template v-if="item.type === 'custom'">
        <slot :name="item.prop" :scope="item"></slot>
      </template>
    </template>
    <slot></slot>
    <a-form-item v-if="!btn_hide">
      <!-- <a-space> -->
      <div class="btn_class">
        <a-button :loading="loading" type="primary" @click="submitForm()">{{ querytext }}</a-button>
        <a-button @click="resetForm()" v-if="!hidden_refresh">清空</a-button>
        <slot name="operation"></slot>
      </div>
      <!-- </a-space> -->
    </a-form-item>
  </a-form>
</template>

<style lang="scss">
.demo-ruleForm {
  .btn_class {
    display: flex;
  }
  label {
    /* min-width: 150px; */
    text-align: right;
  }
  .ant-picker {
    width: 200px;
  }
  .ant-input-affix-wrapper {
    width: 200px;
  }
  .a-form--inline .a-form-item {
    margin-right: 20px;
  }
}
</style>
<style>
</style>