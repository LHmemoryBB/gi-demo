<script setup>
import { reactive, ref } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { openDel, useAxios } from '@/hooks'
import { getActLogList } from '@/api/index'

const ruleForm = reactive({
  startDate: '',
  endDate: '',
  interfaceUser: '',
  interfaceIp: ''
})

const listInput = [
  {
    type: 'time',
    _type: 'datetimerange',
    label: '日期选择',
    prop: ['##datetimerange'],
    _prop: ['startDate', 'endDate'],
    // disabledDate:'2020-04-1',
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始日期', '结束日期']
  },
  {
    type: 'input',
    label: '操作用户',
    prop: 'interfaceUser',
    placeholder: '请输入操作用户'
  },
  {
    type: 'input',
    label: 'ip地址',
    prop: 'interfaceIp',
    placeholder: '请输入ip地址'
  },
  {
    type: 'time',
    _type: 'datetimerange',
    label: '日期选择',
    prop: ['##datetimerange'],
    _prop: ['startDate', 'endDate'],
    // disabledDate:'2020-04-1',
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始日期', '结束日期']
  },
  {
    type: 'input',
    label: '操作用户',
    prop: 'interfaceUser',
    placeholder: '请输入操作用户'
  },
  {
    type: 'input',
    label: 'ip地址',
    prop: 'interfaceIp',
    placeholder: '请输入ip地址'
  },{
    type: 'time',
    _type: 'datetimerange',
    label: '日期选择',
    prop: ['##datetimerange'],
    _prop: ['startDate', 'endDate'],
    // disabledDate:'2020-04-1',
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始日期', '结束日期']
  },
  {
    type: 'input',
    label: '操作用户',
    prop: 'interfaceUser',
    placeholder: '请输入操作用户'
  },
  {
    type: 'input',
    label: 'ip地址',
    prop: 'interfaceIp',
    placeholder: '请输入ip地址'
  },
]

const headers = [
  {
    title: '操作人',
    dataIndex: 'interfaceUser',
    key: 'interfaceUser',
    type: 'slot'
  },
  {
    title: '操作时间',
    dataIndex: 'interfaceTime'
  },
  {
    title: '接口地址',
    dataIndex: 'interfaceUrl'
  },
  {
    title: 'ip地址',
    dataIndex: 'interfaceIp'
  },
  {
    title: '请求数据',
    dataIndex: 'interfaceRequest'
  },
  {
    title: '响应数据',
    dataIndex: 'interfaceReponse',
    ellipsis: true,
  }
]

// const headers = [{
// 		title: '字典父项',
// 		dataIndex: 'parentName',
//     type: 'slot',
//     align: 'center'
// 	}, {
// 		title: '字典名称',
//     align: 'center',
// 		dataIndex: 'itemName'
// 	}, {
// 		title: '字典编码',
//     align: 'center',
// 		dataIndex: 'itemCode'
// 	}, {
// 		title: '字典值',
//     align: 'center',
// 		dataIndex: 'itemValue'
// 	}, {
// 		title: '等级',
//     align: 'center',
// 		dataIndex: 'grade'
// 	}, {
// 		type: 'slot',
// 		title: '操作',
// 		width:	'120px',
//     align: 'center',
// 		dataIndex: 'operation',
// 	}]

const { loading, data, send, pages, onSuccess } = useAxios(getActLogList, {
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
    <div class="table-container ">
      <Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
        <template #operation="{ record }">
          <a-button>测试</a-button>
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