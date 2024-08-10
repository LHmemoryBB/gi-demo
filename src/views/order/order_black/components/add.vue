<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { setBlackInfoAdd } from '@/api/index'
import { notification } from 'ant-design-vue'
const emit = defineEmits()
let Update = reactive({
  title: '新增',
  width: '580px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  phone: '',
  blackTime: ''
})

const validatorPhone = (rule, value, callback) => {
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    return Promise.reject('请输入正确的手机号')
  } else {
    return Promise.resolve()
  }
}
const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '手机号',
    prop: 'phone',
    rules: [
      { required: true, message: '请输入手机号' },
      { validator: validatorPhone, trigger: 'blur' }
    ]
  },
  {
    type: 'select',
    label: '拉黑时长',
    prop: 'blackTime',
    _url: '/blackInfo/blackTime',
    placeholder: '请选择拉黑时长'
  }
]
//open初始
const on_init = () => {
  Update.isShow = true
  Object.assign(ruleForm, _state())
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setBlackInfoAdd, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '新增成功!'
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '新增失败！'
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
