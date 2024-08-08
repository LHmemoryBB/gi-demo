<script setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, switch_beforeChange, useAxios } from '@/hooks'
import { setInterfaceInfoList, setInterfaceInfoDel, setInterfaceEnabled } from '@/api/index'

const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
const ComInterfaceProduct = defineAsyncComponent(() => import('./components/interfaceProduct.vue'))

const ruleForm = reactive({
  platName: '',
  name: '',
  businessId: '',
  enabled: ''
})

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
    prop: 'businessId',
    placeholder: '请输入商户Id'
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
    title: '平台名称',
    dataIndex: 'platName',
    align: 'center'
  },
  {
    title: '商户ID',
    dataIndex: 'businessId',
    align: 'center'
  },
  {
    title: '秘钥',
    dataIndex: 'businessKey',
    align: 'center'
  },
  {
    title: '回调地址',
    dataIndex: 'businessBackUrl',
    align: 'center'
  },
  {
    title: '接口地址',
    dataIndex: 'interfaceUrl',
    align: 'center'
  },
  {
    title: '查单地址',
    dataIndex: 'interfaceQueryUrl',
    align: 'center'
  },
  {
    type: 'slot',
    title: '启停',
    dataIndex: 'enabled',
    align: 'center'
  },
  {
    type: 'slot',
    title: '操作',
    width: '210px',
    dataIndex: 'operation',
    align: 'center'
  }
]

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

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}

const ComInterfaceProductRef = ref()
const onComInterfaceProductEdit = (row) => {
  ComInterfaceProductRef.value?.on_init(row)
}

const ComAddRef = ref()
const onComAdd = () => {
  ComAddRef.value?.on_init()
}

const onComDel = (row) => {
  openDel(setInterfaceInfoDel, { id: row.id }).then(() => {
    submit('form')
  })
}

const switch_enabled_beforeChange = (row) => {
  const data = {
    id: row.id,
    enabled: !row.enabled
  }
  return switch_beforeChange(setInterfaceEnabled, data, row, 'enabled_loading')
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
        <template #enabled="{ record }">
          <a-switch
            v-model:checked="record.enabled"
            checked-children="是"
            un-checked-children="否"
            :loading="record.enabled_loading"
            @change="switch_enabled_beforeChange(record)"
          />
        </template>
        <template #operation="{ record }">
          <a-button type="primary" ghost @click="onComEdit(record)" size="small" >编辑</a-button>
          <a-button type="primary" ghost @click="onComInterfaceProductEdit(record)" size="small" class="m_l_10">套餐配置</a-button>
          <a-button type="primary" ghost @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
        </template>
      </Ttable>
    </div>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
    <ComInterfaceProduct ref="ComInterfaceProductRef" @onSuccess="submit('form')" />
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>