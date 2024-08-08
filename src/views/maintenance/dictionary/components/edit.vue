<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import {useAxios} from '@/hooks'
import { setDictionaryEdit } from '@/api/index'
import { notification } from 'ant-design-vue'
const emit = defineEmits()
let Update = reactive({
  title: '修改',
  width: '580px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  id: '',
  itemName: '',
  itemValue: '',
  itemPCode: ''
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '字典项名称',
    prop: 'itemName',
    rules: { required: true, message: '请输入字典项名称' }
  },
  {
    type: 'input',
    label: '字典项值',
    prop: 'itemValue',
    rules: { required: true, message: '请输入字典项值' }
  },
  {
    type: 'select',
    label: '所属父项',
    prop: 'itemPCode',
    _value: 'value',
    _label: 'text',
    _url: '/dictionary/all',
    filterable: true,
    default_not_request: false
  }
]
//open初始
const on_init = (row) => {
  Update.isShow = true
  for (let keys in ruleForm) {
    ruleForm[keys] = row[keys] ?? ''
  }
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setDictionaryEdit, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '修改成功!',
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改失败！',
  })
})

//提交
const submit = (type) => {
  send(ruleForm)
}
//确认
const confirm = () => {
  RefTform.value?.submitForm()
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" @confirm="confirm" @close="close">
    <Tform
      ref="RefTform"
      :loading="loading"
      :ruleForm="ruleForm"
      :listInput="listInput"
      @submit="submit"
      label_width="120px"
      btn_hide
    >
    </Tform>
  </Tdialog>
</template>


<style scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
.fixed_width {
  display: flex;
  flex-direction: column;
}
</style>
