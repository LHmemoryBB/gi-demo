<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { setInterfaceInfoAdd } from '@/api/index'
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
  moduleClassName: '',
  platName: '',
  categoryId: '',
  businessId: '',
  businessKey: '',
  businessSecret: '',
  businessBackUrl: '',
  interfaceUrl: '',
  interfaceName: '',
  interfaceQueryUrl: '',
  samePlat: false,
  interfaceSort: '',
  enabled: false,
  monitor: false
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '模块类名称',
    prop: 'moduleClassName',
    rules: { required: true, message: '请输入模块类名称' }
  },
  {
    type: 'input',
    label: '平台名称',
    prop: 'platName',
    rules: { required: true, message: '请输入平台名称' }
  },
  {
    type: 'input',
    label: '平台分组',
    prop: 'categoryId',
    rules: { required: false, message: '请输入平台分组' }
  },
  {
    type: 'input',
    label: '商户Id',
    prop: 'businessId',
    rules: { required: false, message: '请输入商户Id' }
  },
  {
    type: 'input',
    label: '商户公钥',
    prop: 'businessKey',
    rules: { required: true, message: '请输入商户公钥' }
  },
  {
    type: 'input',
    label: '商户私钥',
    prop: 'businessSecret',
    rules: { required: false, message: '请输入商户私钥' }
  },
  {
    type: 'input',
    label: '商户回调地址',
    prop: 'businessBackUrl',
    rules: { required: true, message: '请输入商户回调地址' }
  },
  {
    type: 'input',
    label: '商户平台地址',
    prop: 'interfaceUrl',
    rules: { required: true, message: '请输入商户平台地址' }
  },
  {
    type: 'input',
    label: '接口名称',
    prop: 'interfaceName',
    rules: { required: true, message: '请输入接口名称' }
  },
  {
    type: 'input',
    label: '查单地址',
    prop: 'interfaceQueryUrl',
    rules: { required: true, message: '请输入查单地址' }
  },
  {
    type: 'custom',
    prop: 'samePlat'
  },
  {
    type: 'custom',
    prop: 'enabled'
  },
  {
    type: 'custom',
    prop: 'monitor'
  },
  {
    type: 'input',
    label: '接口优先级',
    prop: 'interfaceSort',
    rules: { required: true, message: '请输入接口优先级' }
  }
]
//open初始
const on_init = () => {
  Update.isShow = true
  Object.assign(ruleForm, _state())
  ruleForm.whiteIps = [{ website: '' }]
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setInterfaceInfoAdd, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '新增成功!',
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '新增失败！',
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
      <template #monitor="scope">
        <a-form-item label="是否监控" name="monitor" label-width="120px">
          <a-switch v-model:checked="ruleForm.monitor" checked-children="是" un-checked-children="否"/>
        </a-form-item>
      </template>
      <template #enabled="scope">
        <a-form-item label="是否启用" name="enabled" label-width="120px">
          <a-switch v-model:checked="ruleForm.enabled" checked-children="是" un-checked-children="否"/>
        </a-form-item>
      </template>
      <template #samePlat="scope">
        <a-form-item label="是否同平台" name="samePlat" label-width="120px">
          <a-switch v-model:checked="ruleForm.samePlat" checked-children="是" un-checked-children="否"/>
        </a-form-item>
      </template>
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
