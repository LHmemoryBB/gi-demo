<script setup>
import { reactive, ref } from 'vue'
import { getProductCategoryList, setProductCategoryDel } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { defineAsyncComponent } from 'vue'
import { openDel, useAxios } from '@/hooks'

const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))

const ruleForm = reactive({
  categoryName: '',
  pid: ''
})

const listInput = [
  {
    type: 'input',
    label: '分类名称',
    prop: 'categoryName',
    placeholder: '请输入分类名称'
  },
  {
    type: 'select',
    label: '所属父类',
    prop: 'pid',
    _url: '/productCategory/category',
    filterable: true,
    default_not_request: true
  }
]

const headers = [
  {
    title: '分类名称',
    dataIndex: 'categoryName',
	align: 'center'
  },
  {
    title: '等级',
    dataIndex: 'grade',
	align: 'center'
  },
  {
    title: '排序',
    dataIndex: 'categorySort',
	align: 'center'
  },
  {
    title: '所属父类',
    dataIndex: 'parentName',
	align: 'center'
  },
  {
    type: 'slot',
    title: '操作',
    width: '150px',
	dataIndex: 'operation',
	align: 'center'
  }
]

const { loading, data, send, pages, onSuccess } = useAxios(getProductCategoryList, {
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
  openDel(setProductCategoryDel, { id: row.id }).then(() => {
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