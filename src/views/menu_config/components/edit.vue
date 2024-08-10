<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { roleMenuEdit } from '@/api/index'
import { notification } from 'ant-design-vue'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons-vue'
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
  pid: '',
  name: '',
  parentDirectory: '',
  childDirectory: '',
  path: '',
  buttons: '',
  icon: '',
  menuSort: ''
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '菜单名称',
    prop: 'name',
    rules: { required: true, message: '请输入菜单名称' }
  },
  {
    type: 'input',
    label: '路径',
    prop: 'path',
    rules: { required: true, message: '请输入路径' }
  },
  {
    type: 'input',
    label: '图标',
    prop: 'icon',
    rules: { required: true, message: '请选择图标' }
  },
  {
    type: 'custom',
    label: '排序',
    prop: 'menuSort',
    rules: { required: true, message: '请输入排序' }
  }
]
//open初始
const on_init = (row = {}) => {
  Update.isShow = true
  for (let keys in ruleForm) {
    ruleForm[keys] = row[keys] ?? undefined
  }
  ruleForm.menuSort = row.sort
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}
const { loading, data, onSuccess, onError, send } = useAxios(roleMenuEdit, {
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
  if (!ruleForm.pid) {
    ruleForm.pid = 0
    ruleForm.parentDirectory = ruleForm.path
  } else {
    ruleForm.childDirectory = ruleForm.path
  }
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
      <template #menuSort="scope">
        <a-form-item label="排序" name="menuSort">
          <a-input-number
            v-model:value="ruleForm.menuSort"
            :rules="{ required: true, message: '请输入排序' }"
            :min="1"
            style="width: 200px"
            placeholder="请输入排序"
          />
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
