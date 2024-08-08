<script setup>
import { reactive, ref } from 'vue'
import { getDictionaryList, setDictionaryDel } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { defineAsyncComponent } from 'vue'
import { openDel, useAxios } from '@/hooks'

const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))

const ruleForm = reactive({
  parentCode: '',
  itemCode: '',
  itemName: '',
  itemValue: ''
})

const listInput = [
  {
    type: 'select',
    label: '所属父项',
    prop: 'parentCode',
    _value: 'value',
    _label: 'text',
    filterable: true,
    _url: '/dictionary/all',
    default_not_request: true
  },
  {
    type: 'input',
    label: '字典编码',
    prop: 'itemCode',
    placeholder: '请输入字典项名称'
  },
  {
    type: 'input',
    label: '字典名称',
    prop: 'itemName',
    placeholder: '请输入字典项名称'
  },
  {
    type: 'input',
    label: '字典值',
    prop: 'itemValue',
    placeholder: '请输入字典项值'
  }
]

const headers = [
  {
    title: '字典父项',
    dataIndex: 'parentName',
    align: 'center'
  },
  {
    title: '字典名称',
    dataIndex: 'itemName',
    align: 'center'
  },
  {
    title: '字典编码',
    dataIndex: 'itemCode',
    align: 'center'
  },
  {
    title: '字典值',
    dataIndex: 'itemValue',
    align: 'center'
  },
  {
    title: '等级',
    dataIndex: 'grade',
    align: 'center'
  },
  {
    type: 'slot',
    title: '操作',
    width: '140px',
    align: 'center',
    dataIndex: 'operation'
  }
]

const { loading, data, send, pages, onSuccess } = useAxios(getDictionaryList, {
  defaultParams: ruleForm,
  immediate: true,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true
})

const submit = (type) => {
  if (type == 'form') pages.value.page = 1
  send()
}
const resetForm = () => {
  data.value = []
}

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}

const ComAddRef = ref()
const onComAdd = () => {
  ComAddRef.value?.on_init()
}

const onComDel = (row) => {
  openDel(setDictionaryDel, { id: row.id }).then(() => {
    submit('form')
  })
}
</script>

<template>
  <div class="page-container">
    <div class="form-container">
      <Tform
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        @resetForm="resetForm"
        layout="inline"
      ></Tform>
    </div>
    <div class="table-container">
      <a-button type="primary" ghost @click="onComAdd()">新增</a-button>
      <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
        <template #operation="{ record }">
          <div class="_btn"></div>
          <a-button type="primary" ghost @click="onComEdit(record)" size="small">编辑</a-button>
          <a-button danger ghost @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
        </template>
      </Ttable>
    </div>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>