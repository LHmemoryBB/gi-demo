<script setup>
import { ref, reactive, defineEmits, defineExpose, defineAsyncComponent } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, switch_beforeChange, useAxios } from '@/hooks'
import { setInterfaceProductList, setInterfaceProductDel, setInterfaceProductEnabled } from '@/api/index'

const ComEdit = defineAsyncComponent(() => import('./interfaceProductEdit.vue'))
const ComAdd = defineAsyncComponent(() => import('./interfaceProductAdd.vue'))

const emit = defineEmits()
let Update = reactive({
  title: '套餐配置',
  width: '1200px',
  isShow: false,
  modal: false,
  draggable: false
})

const _state = () => ({
  productName: '',
  productSn: '',
  interfaceId: '',
  enabled: ''
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '套餐名称',
    prop: 'productName',
    placeholder: '请输入套餐名称'
  },
  {
    type: 'input',
    label: '产品编码',
    prop: 'productSn',
    placeholder: '请输入产品编码'
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
    title: '名称',
    dataIndex: 'productName',
    align: 'center'
  },
  {
    title: '成本',
    dataIndex: 'cost',
    align: 'center'
  },
  {
    title: '产品ID',
    dataIndex: 'productId',
    align: 'center'
  },
  {
    title: '产品编码',
    dataIndex: 'productSn',
    align: 'center'
  },
  {
    title: '面值',
    dataIndex: 'par',
    align: 'center'
  },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center'
  },
  {
    title: '利润',
    dataIndex: 'profit',
    align: 'center'
  },
  {
    title: '允许地区',
    dataIndex: 'whiteArea',
    align: 'center'
  },
  {
    title: '限制地区',
    dataIndex: 'blackArea',
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
    width: '150px',
    dataIndex: 'operation',
    align: 'center'
  }
]

const {
  loading,
  onSuccess: getSuccess,
  onError: getError,
  send: getSend,
  data: TableData,
  pages
} = useAxios(setInterfaceProductList, {
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
  ruleForm.interfaceId = row.id
  getSend()
}

//关闭
const close = () => {
  Object.assign(ruleForm, _state())
}

const submit = (type) => {
  if (type == 'form') pages.value.page = 1
  getSend(ruleForm)
}

const resetForm = () => {
  TableData.value = []
}

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init({ ...row, interfaceId: ruleForm.interfaceId })
}

const ComAddRef = ref()
const onComAdd = () => {
  ComAddRef.value?.on_init(ruleForm)
}

const onComDel = (row) => {
  openDel(setInterfaceProductDel, { id: row.id }).then(() => {
    submit('form')
  })
}

const switch_enabled_beforeChange = (row) => {
  const data = {
    id: row.id,
    enabled: !row.enabled
  }
  return switch_beforeChange(setInterfaceProductEnabled, data, row, 'enabled_loading')
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
	  class="form-container"
    ></Tform>
    <a-button type="primary" ghost @click="onComAdd()">新增</a-button>
    <Ttable :loading="loading" :headers="headers" :tableData="TableData" :pages="pages" :tableHeight="600">
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
        <a-button type="primary" ghost @click="onComDel(record)" size="small" class="m_l_10">删除</a-button>
      </template>
    </Ttable>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
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
