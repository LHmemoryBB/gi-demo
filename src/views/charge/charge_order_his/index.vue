<script setup>
import { reactive, ref } from 'vue'
import { useAxios, openExport } from '@/hooks'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import {
  orderChargeInfoListHis,
  orderChargeInfoExportHis,
  chargeBuybackHis,
  orderChargeInfoDetailHis
} from '@/api/index'
import orderDetail from './components/orderDetail.vue'
import { notification, Modal } from 'ant-design-vue'
const ruleForm = reactive({
  orderSn: '',
  outerSn: '',
  amount: '',
  phone: '',
  productName: '',
  areaName: '',
  operatorCh: '',
  orderStatus: '',
  startDate: '',
  endDate: ''
})

const listInput = [
  {
    type: 'select',
    label: '时间类型',
    prop: 'timeType',
    options: [
      {
        value: '创建时间',
        id: 0
      },
      {
        value: '完成时间',
        id: 1
      },
      {
        value: '上报时间',
        id: 2
      }
    ],
    placeholder: '请选择时间类型'
  },
  {
    type: 'time',
    _type: 'datetimerange',
    label: '时间范围',
    prop: ['##datetimerange'],
    _prop: ['startDate', 'endDate'],
    // disabledDate:'2020-04-1',
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始日期', '结束日期']
  },
  {
    type: 'input',
    label: '系统单号',
    prop: 'orderSn',
    placeholder: '请输入系统单号'
  },
  {
    type: 'input',
    label: '商户单号',
    prop: 'outerSn',
    placeholder: '请输入商户单号'
  },

  {
    type: 'select',
    label: '是否验单',
    prop: 'validOrder',
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
    placeholder: '请选择是否验单'
  },
  {
    type: 'select',
    label: '状态',
    prop: 'orderStatus',
    _url: '/orderChargeInfo/orderStatus',
    default_not_request: true
  },
  {
    type: 'select',
    label: '运营商',
    prop: 'operatorCh',
    _url: '/orderChargeInfo/orderOperator',
    default_not_request: true
  },
  {
    type: 'input',
    label: '流水号',
    prop: 'voucher',
    placeholder: '请输入流水号'
  },
  {
    type: 'input',
    label: '手机号',
    prop: 'phone',
    placeholder: '请输入手机号'
  }
]

const headers = [
  { title: '订单编号', dataIndex: 'orderSn', align: 'center' },
  { title: '取单编号', dataIndex: 'platSn', align: 'center' },
  { title: '创建时间', dataIndex: 'createDate', align: 'center' },
  { title: '充值号码', dataIndex: 'phone', align: 'center' },
  { title: '运营商', dataIndex: 'operatorCh', align: 'center' },
  { title: '接单用户', dataIndex: 'userName', align: 'center' },
  {
    title: '订单状态',
    type: 'slot',
    dataIndex: 'orderStatusStr',
    align: 'center'
  },
  { title: '完成时间', dataIndex: 'completeDate', align: 'center' },
  { title: '订单面值', dataIndex: 'par', align: 'center' },
  { title: '平台价', dataIndex: 'amount', align: 'center' },
  { title: '分润', dataIndex: 'inviteProfit', align: 'center' },
  { title: '结算价', dataIndex: 'settlePrice', align: 'center' },
  { title: '流水号', dataIndex: 'voucher', align: 'center' },
  {
    title: '完成验单',
    type: 'slot',
    dataIndex: 'validOrder',
    align: 'center'
  },
  {
    title: '验单结果',
    type: 'slot',
    dataIndex: 'validOrderResult',
    align: 'center'
  },
  {
    title: '上报状态',
    type: 'slot',
    dataIndex: 'reportState',
    align: 'center'
  },
  { title: '上报时间', dataIndex: 'reportTime', align: 'center' },
  {
    title: '操作',
    type: 'slot',
    width: '110px',
    dataIndex: 'operater',
    align: 'center'
  }
]

const { loading, data, send, pages, onSuccess } = useAxios(orderChargeInfoListHis, {
  defaultParams: ruleForm,
  immediate: false,
  data_deconstruction: (res) => res.data,
  total_deconstruction: (res) => res.data.page.total,
  isPages: true
})

const tableData = ref([])
onSuccess((res) => {
  tableData.value = res.data.page.list
})

const submit = (type) => {
  if (type == 'form') pages.page = 1
  send()
}
const resetForm = () => {
  data.value = []
}

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}
const getStr = (type) => {
  switch (type) {
    case 0:
      return 'red'
    case 1:
      return 'blue'
    case 2:
      return 'green'
    case 3:
      return 'orange'
    default:
      break
  }
}

const open = () => {
  const data = {
    ...ruleForm,
    page: 0,
    size: 0
  }
  openExport(orderChargeInfoExportHis, data)
}
const {
  loading: buybackLoading,
  send: buybackSend,
  onSuccess: buybackSuccess,
  onError: buybackError
} = useAxios(chargeBuybackHis, {
  immediate: false
})
buybackSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message
  })
  send()
})
buybackError((res) => {
  notification.error({
    message: '提示',
    description: res.message
  })
})
// 返销
const buyBackOrder = (id) => {
  Modal.confirm({
    title: '是否确认返销？',
    okText: '确认',
    cancelText: '取消',
    type: 'warning',
    onOk() {
      buybackSend({ id: id })
    }
  })
}

// 订单详情
const orderDetailRef = ref(null)
// 获取验单详情
const {
  loading: OrderDetailLoading,
  send: OrderDetailSend,
  onSuccess: OrderDetailSuccess,
  onError: OrderDetailError
} = useAxios(orderChargeInfoDetailHis, {
  immediate: false
})
OrderDetailSuccess((res) => {
  orderDetailRef.value.on_init(res.data)
})
OrderDetailError((error) => {
  console.log(error)
})
const changeOrder = (row) => {
  OrderDetailSend({ id: row.id })
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
      <a-button type="primary" ghost @click="open()">导出数据</a-button>
      <span style="margin-left: 10px; font-size: 14px"> 订单总金额：{{ data.totalAmount }} </span>
      <Ttable ref="TtableRef" :loading="loading" :headers="headers" :tableData="tableData" :pages="pages">
        <template #orderStatusStr="{ record }">
          <a-tag :color="getStr(record.orderStatus)">{{ record.orderStatusStr }}</a-tag>
        </template>
        <template #validOrder="{ record }">
          <a-tag :color="record.validOrder ? 'green' : 'red'">{{ record.validOrder ? '是' : '否' }}</a-tag>
        </template>
        <template #validOrderResult="{ record }">
          <a-tag :color="record.validOrderResult ? 'green' : 'red'">{{
            record.validOrderResult ? '是' : '否'
          }}</a-tag>
        </template>
        <template #reportState="{ record }">
          <a-tag :color="record.reportState ? 'green' : 'red'">{{
            record.reportState ? '已上报' : '未上报'
          }}</a-tag>
        </template>
        <template #operater="{ record }">
          <a-button type="primary" ghost v-if="record.orderStatus === 2" @click="buyBackOrder(record.id)">返销</a-button>
          <a-button type="primary" ghost @click="changeOrder(record)" :loading="OrderDetailLoading">查看</a-button>
        </template>
      </Ttable>
    </div>
    <orderDetail ref="orderDetailRef" @submit="submit" />
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>
