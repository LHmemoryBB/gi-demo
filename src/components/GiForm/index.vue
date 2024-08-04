<script lang="ts" setup>
import { reactive, ref, defineExpose, defineEmits } from 'vue'
import GiSelect from '@/components/GiSelect/index.vue'
import GiRadio from '@/components/GiRadio/index.vue'

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
  }
})
//form提交
const emit = defineEmits(['submit', 'resetForm'])
const formRef = ref()
//keys 不同的查询条件
const submitForm = async (keys) => {
  if (!formRef) return
  await formRef.value?.validate((valid, fields) => {
    if (valid) {
      emit('submit', 'form', keys)
    }
  })
}
//清空
const resetForm = () => {
	console.log(formRef.value);
	
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
const disabledDate = (time: number, disabledDate: String) => {
  return time < new Date(disabledDate) || time.getTime() > Date.now()
}

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
  <a-form ref="formRef" :model="ruleForm" :inline="inline" :label-width="label_width" class="demo-ruleForm">
    <template v-for="item in listInput">
      <template v-if="item.type !== 'custom'">
        <a-form-item v-if="!item.isHide" :label="item.label" :prop="item.prop" :rules="item.rules || null">
          <a-input
            v-if="item.type == 'input'"
            :disabled="item.disabled"
            v-model="ruleForm[item.prop]"
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
            v-model="ruleForm[item.prop]"
            :placeholder="item.placeholder || '请输入' + item.label"
            allow-clear
          />
          <a-date-picker
            v-else-if="item.type == 'time'"
            v-model="ruleForm[item.prop]"
            :type="item._type"
            :start-placeholder="item.placeholder[0]"
            :end-placeholder="item.placeholder[1]"
            :value-format="item.format ?? 'YYYYMMDD'"
            @change="(date) => SetDatePacker(date, item._prop)"
            @clear="SetDatePacker(null, item._prop)"
            :disabled-date="(time) => disabledDate(time, item.disabledDate ?? '')"
            range-separator="至"
          />
          <GiSelect
            v-else-if="item.type == 'select'"
            :ruleForm="ruleForm"
            :listInput="item"
            @selectChange="selectChange"
          />
          <GiRadio
            v-else-if="item.type == 'radio'"
            :ruleForm="ruleForm"
            :listInput="item"
            @selectChange="radioChange"
          />

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
      <a-space>
        <a-button :loading="loading" type="primary" @click="submitForm()">{{ querytext }}</a-button>
        <a-button @click="resetForm()" v-if="!hidden_refresh">清空</a-button>
        <slot name="operation"></slot>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<style scoped>
.ant-input-affix-wrapper {
  width: 200px;
}
.a-form--inline .a-form-item {
  margin-right: 20px;
}
</style>
<style>
.dialog .a-form:not(.a-form--inline) .a-form-item__content .a-input.a-input--default.a-input--suffix {
  width: 90%;
}
.fixed_width .a-input,
.dialog .a-select .a-input {
  width: 200px !important;
}
</style>