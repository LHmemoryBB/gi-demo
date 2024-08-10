<script setup>
import { ref, reactive, defineAsyncComponent } from 'vue'
import { getCardCategory, setCardCategoryDel } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, useAxios } from '@/hooks'

const ComAdd = defineAsyncComponent(() => import('./card_category/add.vue'))
const ComEdit = defineAsyncComponent(() => import('./card_category/edit.vue'))
const ComCardType = defineAsyncComponent(() => import('./card_category/cardType.vue'))

const ruleForm = reactive({
  categoryName: ''
})

const listInput = [
  {
    type: 'input',
    label: '卡类名称',
    prop: 'categoryName',
    placeholder: '请输入卡类名称'
  }
]

const headers = [
  {
    title: '卡类名称',
    dataIndex: 'categoryName',
    align: 'center'
  },
  {
    type: 'slot',
    title: '背景色',
    dataIndex: 'color',
    align: 'center'
  },
  {
    title: '卡片图标',
    dataIndex: 'icon',
    align: 'center'
  },
  {
    type: 'slot',
    label: '操作',
    dataIndex: 'operation',
    align: 'center'
  }
]

const { loading, data, send, pages, onSuccess } = useAxios(getCardCategory, {
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
  openDel(setCardCategoryDel, { id: row.id }).then(() => {
    submit('form')
  })
}

const ComCardTypeRef = ref()
const onComCardType = (row) => {
  ComCardTypeRef.value?.on_init(row)
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
        <template #color="{ record }">
          <a-button :style="{background: record.color}" style="border:none"></a-button>
        </template>
        <template #operation="{ record }">
          <div class="_btn"></div>
          <a-button type="primary" ghost @click="onComEdit(record)" size="small">编辑</a-button>
          <a-button type="primary" ghost @click="onComCardType(record)" class="m_l_10" size="small">配置卡种</a-button>
          <a-button danger ghost @click="onComDel(record)" class="m_l_10" size="small">删除</a-button>
        </template>
      </Ttable>
    </div>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
    <ComCardType ref="ComCardTypeRef" />
  </div>
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
