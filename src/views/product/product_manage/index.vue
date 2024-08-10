<script setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, useAxios, switch_beforeChange } from '@/hooks'
import { getProductList, setProductDel, setProductEnabled, setProductMarketd } from '@/api/index'

const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))

const ruleForm = reactive({
  categoryId: '',
  productName: '',
  operator: '',
  marketd: '',
  enabled: ''
})
const listInput = [
  {
    type: 'select',
    label: '所属分类',
    prop: 'categoryId',
    _url: '/productCategory/category',
    default_not_request: true
  },
  {
    type: 'input',
    label: '产品名称',
    prop: 'productName',
    placeholder: '请输入产品名称'
  },
  {
    type: 'select',
    label: '运营商',
    prop: 'operator',
    _url: '/product/operator',
    default_not_request: true
  },
  {
    type: 'select',
    label: '是否上架',
    prop: 'marketd',
    options: [
      {
        value: '是',
        id: 1
      },
      {
        value: '否',
        id: 0
      }
    ],
    placeholder: '请选择是否上架',
    default_not_request: true
  },
  {
    type: 'select',
    label: '是否启用',
    prop: 'enabled',
    options: [
      {
        value: '是',
        id: 1
      },
      {
        value: '否',
        id: 0
      }
    ],
    placeholder: '请选择是否启用',
    default_not_request: true
  }
]

const headers = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '50px',
    align: 'center'
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    width: '80px',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'productName',
    width: '120px',
    align: 'center'
  },
  {
    title: '运营商',
    dataIndex: 'operatorStr',
    width: '80px',
    align: 'center'
  },
  {
    title: '允许地区',
    dataIndex: 'whiteArea',
    width: '100px',
    align: 'center'
  },
  {
    title: '限制地区',
    dataIndex: 'blackArea',
    width: '100px',
    align: 'center'
  },
  {
    title: '面值',
    dataIndex: 'par',
    width: '80px',
    align: 'center'
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: '80px',
    align: 'center'
  },
  {
    type: 'slot',
    title: '接口套餐',
    width: '180px',
    align: 'center',
    dataIndex: 'interfaceName'
  },
  {
    type: 'slot',
    title: '上架',
    width: '80px',
    align: 'center',
    dataIndex: 'marketd'
  },
  {
    type: 'slot',
    title: '启停',
    width: '80px',
    align: 'center',
    dataIndex: 'enabled'
  },
  {
    type: 'slot',
    title: '操作',
    align: 'center',
    dataIndex: 'operation'
  }
]
const { loading, data, send, pages, onSuccess } = useAxios(getProductList, {
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
  openDel(setProductDel, { id: row.id }).then(() => {
    submit('form')
  })
}

const switch_enabled_beforeChange = (row) => {
  const data = {
    id: row.id,
    enabled: !row.enabled
  }
  return switch_beforeChange(setProductEnabled, data, row, 'enabled_loading')
}

const switch_marketd_beforeChange = (row) => {
  const data = {
    id: row.id,
    marketd: !row.marketd
  }
  return switch_beforeChange(setProductMarketd, data, row, 'marketd_loading')
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
        <template #interfaceName="{ record }">
          <div>
            <div v-for="(item, index) in record.interfaceName.split(',')" :key="index">
              {{ item }}
            </div>
          </div>
        </template>
        <template #enabled="{ record }">
          <a-switch
            v-model:checked="record.enabled"
            checked-children="是"
            un-checked-children="否"
            :loading="record.enabled_loading"
            @change="switch_enabled_beforeChange(record)"
          />
        </template>
        <template #marketd="{ record }">
          <a-switch
            v-model:checked="record.marketd"
            checked-children="是"
            un-checked-children="否"
            :loading="record.marketd_loading"
            @change="switch_marketd_beforeChange(record)"
          />
        </template>
        <template #operation="{ record }">
          <a-button type="primary" ghost @click="onComEdit(record)" size="small">编辑</a-button>
          <a-button danger ghost @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
        </template>
      </Ttable>
    </div>
    <ComEdit ref="ComEditRef" @onSuccess="submit" />
    <ComAdd ref="ComAddRef" @onSuccess="submit" />
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>