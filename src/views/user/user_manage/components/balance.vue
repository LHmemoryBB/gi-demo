<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { setUserBalance } from '@/api/index'
import { notification } from 'ant-design-vue'

const emit = defineEmits()
let Update = reactive({
  title: '充值',
  width: '480px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  id: '',
  balanceChange: '',
  balance: '',
  userName: '',
  remark: ''
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '用户名',
    prop: 'userName',
    placeholder: ' ',
    disabled: true
  },
  {
    type: 'input',
    label: '余额',
    prop: 'balance',
    placeholder: ' ',
    disabled: true
  },
  {
    type: 'input',
    label: '充值金额',
    prop: 'balanceChange',
    rules: { required: true, message: '请输入充值金额' }
  },
  {
    type: 'textarea',
    label: '备注',
    prop: 'remark',
    rules: { required: true, message: '请输入备注' }
  }
]
//open初始
const on_init = (row) => {
  Update.isShow = true
  // ruleForm['id'] = row['id'] ?? ''

  for (let keys in ruleForm) {
    ruleForm[keys] = row[keys] ?? ''
  }
}

//关闭
const RefTform = ref(null)
const close = () => {
  Object.assign(ruleForm, _state())
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setUserBalance, {
  immediate: false
})

onSuccess((res) => {
  notification.success({
    title: '提示',
    message: res.message || '新增成功!',
    duration: 3
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    title: '提示',
    message: res.message || '新增失败！',
    duration: 3
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
</style>
