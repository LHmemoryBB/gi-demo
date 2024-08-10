<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { roleMenuDel } from '@/api/index'
import { notification, message, Modal } from 'ant-design-vue'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons-vue'
const emit = defineEmits()
let Update = reactive({
  title: '是否确认删除',
  width: '580px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  id: '',
  name: ''
})

const ruleForm = reactive(_state())
//open初始
const menuName = ref('')
const on_init = (row) => {
  Update.isShow = true
  for (let keys in ruleForm) {
    ruleForm[keys] = row[keys] ?? ''
  }
  menuName.value = ''
}
//关闭
const { loading, data, onSuccess, onError, send } = useAxios(roleMenuDel, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '修改成功!'
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改成功!'
  })
})

//提交
const submit = (type) => {
  send({id: ruleForm.id})
}
//确认

const confirm = () => {
  if (menuName.value !== ruleForm.name) {
    return message.warning('请正确输入要删除的菜单名称')
  }
  Modal.confirm({
    title: '请再次确认是否删除该菜单',
    content: h('div', { style: 'color:red;' }, `${ruleForm.name}`),
    onOk() {
      submit()
    }
  })
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" @confirm="confirm">
    <a-alert message="为防止误操作，请在输入框中输入要删除的菜单名称，再进行删除" type="warning" />
    <a-input v-model:value="ruleForm.name" disabled style="width:200px;margin:10px;user-select: none;"></a-input>
    <a-input v-model:value="menuName" style="width:200px;margin:10px"></a-input>
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
.btn_item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  :deep(.ant-input-affix-wrapper) {
    // width: 130px;
    margin-right: 10px;
  }
}
</style>
