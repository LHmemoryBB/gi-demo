<script setup>
import { reactive, ref, defineAsyncComponent } from 'vue'
import clipboard3 from 'vue-clipboard3'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, openToBlack, openCallBack, openChangeStatus, openBuyBack, openExport, useAxios } from '@/hooks'
import {
  setOrderInfoList,
  setOrderInfoToBlack,
  setOrderInfoChangeStatus,
  setOrderCallBack,
  getOrderInfoExport,
  setOrderBuyBack
} from '@/api/index'
import { notification } from 'ant-design-vue'
//解构出复制方法
const { toClipboard } = clipboard3()
const ComOrderLog = defineAsyncComponent(() => import('./components/orderLog.vue'))
const ComVoucher = defineAsyncComponent(() =>
  import('@/views/interface/interface_manage/components/interfaceProductPreview.vue')
)
const ComVoucherOld = defineAsyncComponent(() => import('./components/voucher.vue'))

const ruleForm = reactive({
  timeType: '',
  startDate: '',
  endDate: '',
  orderSn: '',
  userName: '',
  productName: '',
  phone: '',
  areaName: '',
  operator: '',
  orderStatus: '',
  interfaceName: ''
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
        value: '上单时间',
        id: 2
      },
      {
        value: '失败时间',
        id: 3
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
    label: '商户单号',
    prop: 'outOrderSn',
    placeholder: '请输入单号'
  },
  {
    type: 'input',
    label: '单号',
    prop: 'orderSn',
    placeholder: '请输入单号'
  },
  {
    type: 'input',
    label: '客户',
    prop: 'userName',
    placeholder: '请输入客户'
  },
  {
    type: 'select',
    label: '运营商',
    prop: 'operator',
    _url: '/product/operator',
    filterable: true,
    default_not_request: true
  },
  {
    type: 'input',
    label: '产品名称',
    prop: 'productName',
    placeholder: '请输入产品名称'
  },
  {
    type: 'input',
    label: '账号',
    prop: 'phone',
    placeholder: '请输入账号'
  },
  {
    type: 'input',
    label: '归属',
    prop: 'areaName',
    placeholder: '请输入归属'
  },
  {
    type: 'select',
    label: '状态',
    prop: 'orderStatus',
    options: [
      {
        value: '充值失败',
        id: 0
      },
      {
        value: '充值中',
        id: 1
      },
      {
        value: '充值成功',
        id: 2
      },
      {
        value: '返销',
        id: 3
      }
    ],
    placeholder: '请选择状态'
  },
  {
    type: 'select',
    label: '订单类型',
    prop: 'orderType',
    options: [
      {
        value: '话费流量',
        id: 0
      },
      {
        value: '权益',
        id: 1
      }
    ],
    placeholder: '请选择订单类型'
  },
  {
    type: 'input',
    label: '接口名称',
    prop: 'interfaceName',
    placeholder: '请输入接口名称'
  }
]
const headers = [
  {
    title: '单号',
    dataIndex: 'orderSn',
	align: 'center'
  },
  {
    title: '客户',
    dataIndex: 'userName',
	align: 'center'
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
	align: 'center'
  },
  {
    type: 'slot',
    title: '账号',
    width: '120px',
    dataIndex: 'phone',
	align: 'center'
  },
  {
    title: '归属',
    dataIndex: 'areaName',
	align: 'center'
  },
  {
    type: 'slot',
    title: '状态',
    default: 'orderStatusStr',
	align: 'center'
  },
  {
    type: 'slot',
    title: '时间',
    width: '200px',
    dataIndex: 'pushDate',
	align: 'center'
  },
  {
    title: '金额',
    dataIndex: 'amount',
	align: 'center'
  },
  {
    title: '接口',
    dataIndex: 'interfaceName',
	align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remark',
	align: 'center'
  },
  {
    title: '回调地址',
    dataIndex: 'rebackUrl',
	align: 'center'
  },
  {
    title: '耗时',
    dataIndex: 'time',
	align: 'center'
  },
  {
    title: '卡密/流水',
    dataIndex: 'rebackInfo',
	align: 'center'
  },
  {
    title: '回调次数',
    dataIndex: 'rebackNum',
	align: 'center'
  },
  {
    type: 'slot',
    title: '操作',
    width: '100px',
    dataIndex: 'operation',
	align: 'center'
  }
]
const { loading, data, send, pages, onSuccess } = useAxios(setOrderInfoList, {
  defaultParams: ruleForm,
  immediate: false,
  data_deconstruction: (res) => res.data,
  total_deconstruction: (res) => res.data.page.total,
  isPages: true
})

const sumPoint = ref(0)
const tableData = ref([])
onSuccess((res) => {
  sumPoint.value = res.data.sumPoint
  tableData.value = res.data.page.list
})

const submit = (type) => {
  if (type == 'form') pages.value.page = 1
  send()
}
const resetForm = () => {
  data.value = []
}

const onComRecharge = (type, row) => {
  openChangeStatus(setOrderInfoChangeStatus, { id: row.id, orderStatus: type }, '确定要修改状态吗？').then(() => {
    submit('form')
  })
}

const onComBlock = (row) => {
  openToBlack(setOrderInfoToBlack, { id: row.id }, '确定要拉黑吗？').then(() => {
    submit('form')
  })
}

const onBuyBack = (row) => {
  openBuyBack(setOrderBuyBack, { id: row.id }, '确定要返销吗？').then(() => {
    submit('form')
  })
}

const onComCallBack = (row) => {
  openCallBack(setOrderCallBack, { id: row.id }, '确定手动回调吗？').then(() => {
    submit('form')
  })
}

const open = () => {
  const data = {
    ...ruleForm,
    page: 0,
    size: 0
  }
  openExport(getOrderInfoExport, data)
}

const TtableRef = ref(null)
const onBatch = (type) => {
  const SelectionRows = TtableRef.value.getSelectionRows()
  if (!SelectionRows.length) {
    notification.warning({
      message: '提示',
      description: '至少选则一项！',
    })
    return
  }
  const ids = SelectionRows.map((item) => item.id)
  openChangeStatus(
    setOrderInfoChangeStatus,
    { ids: ids, orderStatus: type },
    type == 2 ? '确定要批量成功吗？' : '确定要批量失败吗？'
  ).then(() => {
    submit('form')
  })
}

const onBatchCallBack = () => {
  const SelectionRows = TtableRef.value.getSelectionRows()
  if (!SelectionRows.length) {
    notification.warning({
      message: '提示',
      description: '至少选则一项！',
    })
    return
  }
  const ids = SelectionRows.map((item) => item.id)
  openCallBack(setOrderCallBack, { ids: ids }, '确定批量回调吗？').then(() => {
    submit('form')
  })
}

const ComOrderLogRef = ref()
const onComOrderLog = (row) => {
  ComOrderLogRef.value?.on_init(row)
}

const ComVoucherRef = ref()
const ComVoucherRefOld = ref()
const onComVoucher = (row) => {
  if (row.voucherModel == 0) {
    ComVoucherRefOld.value.on_init(row)
    return false
  }
  let data = JSON.parse(JSON.stringify(row))
  if (/^\d+$/.test(row.rebackInfo)) {
    data.voucher = row.rebackInfo
  }
  ComVoucherRef.value?.on_init(row.voucherModel, data)
}

const onCopy = async (e) => {
  try {
    await toClipboard(e)
    notification.success({
      message: '提示',
      description: '已复制',
    })
  } catch (error) {
    notification.error({
      message: '提示',
      description: '复制失败',
    })
  }
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
      <a-button type="primary" @click="onBatch(2)">批量成功</a-button>
      <a-button type="primary" @click="onBatch(0)" class="m_l_10">批量失败</a-button>
      <a-button type="primary" @click="onBatchCallBack()" class="m_l_10">批量回调</a-button>
      <a-button type="primary" @click="open()" class="m_l_10">导出数据</a-button>
      <span style="margin-left: 10px; font-size: 14px"> 订单总金额：{{ data.totalAmount }} 元 </span>
      <Ttable
        ref="TtableRef"
        :loading="loading"
        :headers="headers"
        :tableData="tableData"
        :pages="pages"
        :selection_all_show="true"
      >
        <template #orderStatusStr="{ scope }">
          <a-tag
            :type="
              scope.row.orderStatusStr == '充值成功'
                ? 'success'
                : scope.row.orderStatusStr == '充值失败'
                ? 'danger'
                : ''
            "
            >{{ scope.row.orderStatusStr }}</a-tag
          >
        </template>
        <template #phone="{ scope }">
          <a-tag
            style="border-bottom: 1px dashed; cursor: pointer"
            :type="'success'"
            @click="onCopy(scope.row.phone)"
            >{{ scope.row.phone }}</a-tag
          >
        </template>
        <template #pushDate="{ scope }">
          <div>创建时间{{ scope.row.createDate }}</div>
          <div>上单时间{{ scope.row.pushDate }}</div>
          <div>完成时间{{ scope.row.finishDate }}</div>
        </template>
        <template #operation="{ scope }">
          <div class="btn">
            <template v-if="scope.row.orderStatus == 1">
              <a-button type="primary" text @click="onComRecharge(2, scope.row)">手动成功</a-button>
              <a-button type="primary" text @click="onComRecharge(0, scope.row)">手动失败</a-button>
            </template>
            <a-button type="primary" text @click="onComOrderLog(scope.row)">日志</a-button>
            <template v-if="!scope.row.rebackState">
              <a-button type="primary" text @click="onComCallBack(scope.row)">手动回调</a-button>
            </template>
            <template v-if="scope.row.orderStatus == 2 || scope.row.orderStatus == 3">
              <a-button type="primary" text @click="onComVoucher(scope.row)">凭证</a-button>
            </template>
            <a-button type="primary" text @click="onComBlock(scope.row)">拉黑</a-button>
            <template v-if="scope.row.orderStatus != 3">
              <a-button type="primary" text @click="onBuyBack(scope.row)">返销</a-button>
            </template>
          </div>
        </template>
      </Ttable>
    </div>
    <ComOrderLog ref="ComOrderLogRef" />
    <ComVoucher ref="ComVoucherRef" />
    <ComVoucherOld ref="ComVoucherRefOld" />
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn button {
  display: block;
  margin: 0;
  margin-top: 10px;
}
</style>