<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { setCardCategoryAdd } from '@/api/index'
// import { ColorPicker } from 'ant-design-vue';
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
  categoryCode: '',
  color: '',
  icon: '',
  categorySort: 1
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'select',
    label: '卡类名称',
    prop: 'categoryCode',
    _url: '/cardCategory/selectCardCategory',
    _value: 'value',
    _label: 'text',
    filterable: true,
    rules: { required: true, message: '请选择卡类名称' },
    default_not_request: true
  },
  {
    type: 'custom',
    prop: 'color'
  },
  {
    type: 'input',
    label: '图标',
    prop: 'icon',
    rules: { required: true, message: '请输入图标' }
  },
  {
    type: 'input',
    label: '排序',
    prop: 'categorySort',
    rules: { required: true, message: '请输入排序' }
  }
]
//open初始
const on_init = (id) => {
  Update.isShow = true
  Object.assign(ruleForm, _state())
}
//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setCardCategoryAdd, {
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
      <template #color="scope">
        <a-form-item label="背景色" name="color" label-width="120px">
          <!-- <el-color-picker v-model="ruleForm.color" /> -->
          <!-- <ColorPicker /> -->
          <input type="color" v-model="ruleForm.color" />
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
