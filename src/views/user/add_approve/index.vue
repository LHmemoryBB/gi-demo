<script setup>
import { reactive, ref } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openChangeStatus, useAxios } from '@/hooks'
import { getUserApplyList, setApplyApproved } from '@/api/index'

const ruleForm = reactive({
  startDate: '',
  endDate: '',
  userName: '',
  actionType: 1,
  approved: ''
})

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
    type: 'input',
    label: '用户名称',
    prop: 'userName',
    placeholder: '请输入用户名称'
  },
  {
    type: 'input',
    label: '记录编号',
    prop: 'applyCode',
    placeholder: '请输入记录编号'
  },
  {
    type: 'select',
    label: '审核结果',
    prop: 'approved',
    options: [
      {
        value: '通过',
        id: 1
      },
      {
        value: '不通过',
        id: 0
      }
    ],
    placeholder: '请选择审核结果',
    default_not_request: true
  }
]

const headers = [
  {
    title: '申请时间',
    dataIndex: 'createDate',
    align: 'center'
  },
  {
    title: '申请人',
    dataIndex: 'userName',
    align: 'center'
  },
  {
    title: '记录编号',
    dataIndex: 'applyCode',
    align: 'center'
  },
  {
    type: 'slot',
    title: '转账凭证',
    dataIndex: 'voucher',
    align: 'center'
  },
  {
    title: '充值金额',
    dataIndex: 'balance',
    align: 'center'
  },
  {
    title: '支付方式',
    dataIndex: 'payTypeStr',
    align: 'center'
  },
  {
    type: 'slot',
    title: '操作',
    width: '150px',
    dataIndex: 'operation'
  }
]
const { loading, data, send, pages, onSuccess } = useAxios(getUserApplyList, {
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

const onApproved = (type, row) => {
  openChangeStatus(setApplyApproved, { id: row.id, approved: type }, '确定操作吗？').then(() => {
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
      <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
        <template #voucher="{ record }">
          <img style="width: 100px; height: 100px" :src="record.voucher" fit />
        </template>
        <template #operation="{ record }">
          <div class="btn">
            <template v-if="!record.checked">
              <a-button type="primary" @click="onApproved(true, record)" size="small">通过</a-button>
              <a-button type="primary" @click="onApproved(false, record)" class="m_l_10" size="small">拒绝</a-button>
            </template>
          </div>
        </template>
      </Ttable>
    </div>
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>
