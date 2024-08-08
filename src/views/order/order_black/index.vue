<script setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import { setBlackInfoList, setBlackInfoDel } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, useAxios } from '@/hooks'

const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))

const ruleForm = reactive({
  phone: ''
})

const listInput = [
  {
    type: 'input',
    label: '手机号',
    prop: 'phone',
    placeholder: '请输入手机号'
  }
]
const headers = [
  {
    title: '手机号',
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: '拉黑时间',
    dataIndex: 'createDate',
    align: 'center'
  },
  {
    title: '截止时间',
    dataIndex: 'expireDate',
    align: 'center'
  },
  {
    type: 'slot',
    title: '操作',
    width: '150px',
    align: 'center',
    dataIndex: 'operation'
  }
]

const { loading, data, send, pages, onSuccess } = useAxios(setBlackInfoList, {
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

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}

const ComAddRef = ref()
const onComAdd = () => {
  ComAddRef.value?.on_init()
}

const onComDel = (row) => {
  openDel(setBlackInfoDel, { id: row.id }).then(() => {
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
      <a-button type="primary" @click="onComAdd()">新增</a-button>
      <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
        <template #operation="{ record }">
          <div class="_btn"></div>
          <a-button type="primary" text @click="onComEdit(record)" size="small">编辑</a-button>
          <a-button type="primary" text @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
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