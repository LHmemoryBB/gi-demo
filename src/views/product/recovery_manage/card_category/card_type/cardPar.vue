<script setup>
import { ref, reactive, defineEmits, defineExpose, defineAsyncComponent } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { useAxios, openDel } from '@/hooks'
import { getCardPar, setCardParDel } from '@/api/index'
const ComAdd = defineAsyncComponent(() => import('./card_par/add.vue'))
const ComEdit = defineAsyncComponent(() => import('./card_par/edit.vue'))

const emit = defineEmits()
let Update = reactive({
  title: '面值配置',
  width: '1000px',
  isShow: false,
  modal: false,
  draggable: false
})

const _state = () => ({
  categoryCode: '',
  typeCode: '',
  parName: ''
})

const ruleForm = reactive(_state())

const listInput = [
  {
    type: 'input',
    label: '面值名称',
    prop: 'parName',
    placeholder: '请输入面值名称'
  }
]

const headers = [
  {
    title: '面值名称',
    dataIndex: 'parName',
    align: 'center'
  },
  {
    title: '回收折扣',
    dataIndex: 'discount',
    align: 'center'
  },
  {
    title: '回收面值',
    dataIndex: 'par',
    align: 'center'
  },
  {
    title: '回收价格',
    align: 'center',
    dataIndex: 'recoveryPrice'
  },
  {
    type: 'slot',
    title: '操作',
    dataIndex: 'operation',
    align: 'center'
  }
]

const { loading, send, data, pages } = useAxios(getCardPar, {
  defaultParams: ruleForm,
  immediate: false,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true
})

//open初始
const on_init = (row) => {
  Update.isShow = true
  Object.assign(ruleForm, _state())
  ruleForm.categoryCode = row.categoryCode
  ruleForm.typeCode = row.typeCode
  send()
}

//关闭
const close = () => {
  data.value = []
}

const submit = (type) => {
  if (type == 'form') pages.value.page = 1
  send()
}

const resetForm = () => {
  Object.assign(ruleForm, _state())
  data.value = []
}

const ComAddRef = ref()
const onComAdd = (ruleform) => {
  ComAddRef.value?.on_init(ruleform)
}
const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}
const onComDel = (row) => {
  openDel(setCardParDel, { id: row.id }).then(() => {
    submit('form')
  })
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" @close="close" footer_hide>
    <Tform
      :loading="loading"
      :ruleForm="ruleForm"
      :listInput="listInput"
      @submit="submit"
      @resetForm="resetForm"
      layout="inline"
    ></Tform>
    <a-button type="primary" @click="onComAdd(ruleForm)">新增</a-button>
    <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages" :tableHeight="600">
      <template #operation="{ record }">
        <a-button type="primary" text @click="onComEdit(record)" size="small" >编辑</a-button>
        <a-button type="primary" text @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
      </template>
    </Ttable>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" calss="m_l_10" />
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
