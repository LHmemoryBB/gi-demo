<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { roleInsert } from '@/api/index'
import { notification } from 'ant-design-vue'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons-vue'
const emit = defineEmits()
let Update = reactive({
  title: '新增',
  width: '580px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  pid: 0,
  name: '',
  icon: '',
  menuSort: ''
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '角色名',
    prop: 'description',
    rules: { required: true, message: '请输入角色名' }
  },
  {
    type: 'input',
    label: '角色标识',
    prop: 'name',
    rules: { required: true, message: '请输入角色标识' }
  },
  {
    type: 'custom',
    label: '授权登录',
    prop: 'canLogin',
  }
]
//open初始
const on_init = (row = {}) => {
  Update.isShow = true
  for (let keys in ruleForm) {
    ruleForm[keys] = row[keys] ?? ''
  }
  ruleForm.pid = 0
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}
const { loading, data, onSuccess, onError, send } = useAxios(roleInsert, {
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
    description: res.message || '新增失败!'
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
    <template #canLogin>
      <a-form-item label="授权登录">
        <a-switch v-model:checked="ruleForm.canLogin" checked-children="是" un-checked-children="否"/>
      </a-form-item>
    </template>
    </Tform>
  </Tdialog>
</template>


<style lang="less" scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
.fixed_width {
  display: flex;
  flex-direction: column;
}
.btn_item{
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	:deep(.ant-input-affix-wrapper){
		// width: 130px;
		margin-right: 10px;
	}
}
</style>
