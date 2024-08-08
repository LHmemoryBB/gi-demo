<script setup>
import { reactive, ref } from 'vue'
import { useAxios } from '@/hooks'
import { getOrderFlow } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import Tselect from '@/components/Templates/Tselect.vue'
import { notification } from 'ant-design-vue'
const ruleForm = reactive({
  operator: '',
  orderId: ''
})

const { loading, data, onSuccess, onError, send } = useAxios(getOrderFlow, {
  defaultParams: ruleForm,
  immediate: false
})

const orderData = ref([])
const dataItem = ref({})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '暂无数据!',
  })
  orderData.value = res.data
  dataItem.value = res.data.item
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '查询失败！',
  })
})

const submit = (type) => {
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
        :listInput="[]"
        @submit="submit"
        @resetForm="resetForm"
        layout="inline"
        querytext="查询"
      >
        <a-form-item label="运营商" prop="operator" :rules="{ required: true, message: '请选择运营商' }">
          <Tselect
            :ruleForm="ruleForm"
            :listInput="{
              label: '运营商',
              prop: 'operator',
              _url: '/product/operator',
              _value: 'id',
              _label: 'value',
              default_not_request: true,
              every_time_request: true
            }"
          />
        </a-form-item>
        <a-form-item label="流水号" prop="orderId" :rules="{ required: true, message: '请选择流水号' }">
          <a-input v-model="ruleForm.orderId" placeholder="请输入流水号" clearable />
        </a-form-item>
      </Tform>
    </div>
    <div class="table-container">
      <a-descriptions class="margin-top" title="流水信息" :column="3" bordered>
        <a-descriptions-item label="流水号"> 
          <div v-if="orderData">{{ orderData.orderId }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            订单金额
          </template>
          <div v-if="orderData">{{ orderData.orderPrice }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            商品编码
          </template>
          <div v-if="orderData">{{ orderData.shopId }}</div>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions class="margin-top" title="充值信息" :column="3" bordered>
        <a-descriptions-item>
          <template #label>
            商品名称
          </template>
          <div v-if="dataItem">{{ dataItem.salesProName }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            支付方式
          </template>
          <div v-if="orderData">{{ orderData.payMethodDescription }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            订单状态
          </template>
          <div v-if="orderData">{{ orderData.orderStatusDescription }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            充值号码
          </template>
          <div v-if="dataItem">{{ dataItem.phoneNumber }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            充值金额
          </template>
          <div v-if="dataItem">{{ dataItem.price }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            支付金额
          </template>
          <div v-if="dataItem">{{ dataItem.realPrice }}</div>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions class="margin-top" title="订单时间" :column="3" bordered>
        <a-descriptions-item>
          <template #label>
            订单创建时间
          </template>
          <div v-if="orderData.createDate">{{ orderData.createDate }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            等待付款时间
          </template>
          <div v-if="orderData.waitPayDate">{{ orderData.waitPayDate }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            发起支付时间
          </template>
          <div v-if="orderData.payDate">{{ orderData.payDate }}</div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            订单充值时间
          </template>
          <div v-if="orderData.addDate">{{ orderData.addDate }}</div>
        </a-descriptions-item>
        <a-descriptions-item v-if="orderData.refundDate">
          <template #label>
            退款到账时间
          </template>
          <div>{{ orderData.refundDate }}</div>
        </a-descriptions-item>
        <a-descriptions-item v-if="orderData.successDate">
          <template #label>
            充值成功时间
          </template>
          <div>{{ orderData.successDate }}</div>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<style scoped>
.a-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>