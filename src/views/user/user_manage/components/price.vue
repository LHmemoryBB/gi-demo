<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import { useAxios } from '@/hooks'
import { getUserPrice, setUserPrice } from '@/api/index'
import { notification } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'

const emit = defineEmits()
let Update = reactive({
  title: '价格自定义',
  width: '800px',
  isShow: false,
  modal: false,
  draggable: false
})

const headers = [
  {
    title: '产品名称',
    dataIndex: 'productName',
    align: 'center'
  },
  {
    title: '产品原价格',
    dataIndex: 'price',
    align: 'center'
  },
  {
    type: 'edit',
    title: '自定义价格',
    dataIndex: 'userPrice',
    align: 'center'
  }
]

const form = ref({})

const {
  loading: getLoading,
  onSuccess: getSuccess,
  onError: getError,
  send: getSend,
  data: TableData
} = useAxios(getUserPrice, {
  immediate: false,
  data_deconstruction: (res) => res.data
})

const getTable = () => {
  getSend({ userId: form.value['UserId'] })
}

//open初始
const on_init = (row) => {
  Update.isShow = true
  form.value = {}
  form.value['UserId'] = row.id
  getTable()
}

const close = () => {}

const change_edit = (row) => {
  form.value['productId'] = row.id
  form.value['price'] = row.userPrice
  Modal.confirm({
    title: '提示',
    content: '确定要提交此次修改吗？',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      send(form.value)
      getTable()
      // if (action === 'confirm') {
      //   // instance.confirmButtonLoading = true
      //   // instance.confirmButtonText = 'Loading...'
        
      // }
      // done()
    }
  })
}

const { loading, data, onSuccess, onError, send } = useAxios(setUserPrice, {
  immediate: false
})
onSuccess((res) => {
  getTable()
  notification.success({
    title: '提示',
    message: res.message || '新增成功!',
    duration: 3
  })
  emit('onSuccess')
})
onError((res) => {
  getTable()
  notification.error({
    title: '提示',
    message: res.message || '新增失败！',
    duration: 3
  })
})

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="loading" @close="close" footer_hide>
    <Ttable :loading="getLoading" :headers="headers" :tableData="TableData" @change_edit="change_edit" pagesHide :tableHeight="600">
    </Ttable>
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
