<script setup>
import { reactive, ref, defineExpose, defineEmits } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, useAxios } from '@/hooks'
import { setInterfaceInfoList } from '@/api/index'

const emit = defineEmits()
let Update = reactive({
  title: '接口列表',
  width: '880px',
  isShow: false,
  modal: false,
  draggable: false
})

const _state = () => ({
  platName: '',
  name: '',
  businessBackUrl: ''
})

const ruleForm = reactive(_state())

const listInput = [
  {
    type: 'input',
    label: '平台名称',
    prop: 'platName',
    placeholder: '请输入平台名称'
  },
  {
    type: 'input',
    label: '接口名称',
    prop: 'name',
    placeholder: '请输入接口名称'
  },
  {
    type: 'input',
    label: '商户Id',
    prop: 'businessBackUrl',
    placeholder: '请输入商户Id'
  }
]

const headers = [{
		title: '平台名称',
		dataIndex: 'platName',
    align: 'center'
	},{
		title: '商户ID',
		dataIndex: 'businessBackUrl',
    align: 'center'
	},{
		title: '秘钥',
		dataIndex: 'businessKey',
    align: 'center'
	},{
		title: '回调地址',
		dataIndex: 'businessBackUrl',
    align: 'center'
	},{
		title: '接口地址',
		dataIndex: 'interfaceUrl',
    align: 'center'
	}, {
		type: 'slot',
		title: '操作',
		width:	'80px',
    dataIndex: 'operation',
    align: 'center'
	}]

//open初始
const on_init = () => {
  Update.isShow = true
  Object.assign(ruleForm, _state())
}

const { loading, data, send, pages, onSuccess } = useAxios(setInterfaceInfoList, {
  defaultParams: ruleForm,
  immediate: true,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true
})

const sumPoint = ref(0)
onSuccess((res) => {
  sumPoint.value = res.data.sumPoint
})

const submit = (type) => {
  if (type == 'form') pages.value.page = 1
  send()
}
const resetForm = () => {
  data.value = []
}

const onChoice = (row) => {
  emit('interfaceId', 'interfaceProductList', row)
  Update.isShow = false
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" footer_hide>
    <div class="content content_form">
      <Tform
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        @resetForm="resetForm"
        layout="inline"
      ></Tform>
    </div>
    <div class="content">
      <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages" :tableHeight="600">
        <template #operation="{ record }">
          <a-button type="primary" text @click="onChoice(record)" size="small">选择</a-button>
        </template>
      </Ttable>
    </div>
  </Tdialog>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>