<script setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import { useAxios } from '@/hooks'
import { AfterSalequery } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import Tselect from '@/components/Templates/Tselect.vue'
// import orderDetail from "./components/detail.vue";

const orderDetail = defineAsyncComponent(() => import('./components/detail.vue'))
let ruleForm = reactive({
  //   userId: "",
  afterSaleStatus: 1
})
const ApprovalDialoRef = ref()
const { loading, data, send, pages, onSuccess } = useAxios(AfterSalequery, {
  defaultParams: ruleForm,
  immediate: true,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true
})
const saleAfterList = ref([])
onSuccess((res) => {
  saleAfterList.value = res.data
})

const submit = (type) => {
  send()
}

const resetForm = () => {
  ruleForm = {
    afterSaleStatus: 1
  }
}
const listInput = [
  {
    type: 'time',
    _type: 'datetimerange',
    label: '日期选择',
    prop: ['##datetimerange'],
    _prop: ['startDate', 'endDate'],
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始日期', '结束日期']
  },
  {
    type: 'select',
    label: '售后状态',
    prop: 'afterSaleStatus',
    _url: '/filmAfterSaleApply/afterSaleStatus',
    _value: 'id',
    _label: 'value',
    filterable: true,
    immediate: true
    // rules: { required: true, message: '请选择运允许地区' },
  },
  {
    type: 'select',
    label: '申请人',
    prop: 'userId',
    _url: '/filmAfterSaleApply/shopUser',
    _value: 'id',
    _label: 'value',
    filterable: true
    // rules: { required: true, message: '请选择运允许地区' },
  }
]
const headers = [
  {
    title: '申请人',
    dataIndex: 'applyUserName',
    align: 'center'
  },
  {
    title: '售后类型',
    dataIndex: 'causeTypeStr',
    align: 'center'
  },
  {
    title: '售后时间',
    dataIndex: 'createDate',
    align: 'center'
  },
  {
    type: 'slot',
    title: '售后图片',
    dataIndex: 'causeImg',
    align: 'center'
  },

  {
    type: 'slot',
    title: '操作',
    width: '130px',
    dataIndex: 'operation',
    align: 'center'
  }
]
const openApprovalDialog = (row) => {
  ApprovalDialoRef.value?.on_init(row)
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
      >
      </Tform>
    </div>
    <div class="table-container">
      <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
        <template #causeImg="{ scope }">
          <img style="width: 100px; height: 100px" :src="scope.row.causeImg" fit />
        </template>
        <template #operation="{ scope }">
          <div class="_btn"></div>
          <a-button type="primary" text @click="openApprovalDialog(scope.row)">审批</a-button>
        </template>
      </Ttable>
    </div>
    <orderDetail ref="ApprovalDialoRef" @onSuccess="submit" />
  </div>
</template>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
