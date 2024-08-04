<script setup>
import { reactive, ref } from "vue";
import { useAxios } from '@/hooks'
import Tform from "@/components/GiForm/index.vue";
import Ttable from "@/components/Templates/Ttable.vue";
import { openExport } from "@/hooks/export";
import { waitValidOrderList, checkOrderDetail } from "@/api/index";
import cutdownTimer from "@/components/cutdownTimer.vue";
import orderDetail from './components/orderDetail.vue'
const ruleForm = reactive({
  orderSn: "",
  outerSn: "",
  amount: "",
  phone: "",
  productName: "",
  areaName: "",
  operatorCh: "",
  orderStatus: "",
  startDate: "",
  endDate: "",
});

const listInput = [
  {
    type: "select",
    label: "时间类型",
    prop: "timeType",
    options: [
      {
        value: "创建时间",
        id: 0,
      },
      {
        value: "完成时间",
        id: 1,
      },
      {
        value: "上报时间",
        id: 2,
      },
    ],
    placeholder: "请选择时间类型",
  },
  {
    type: "time",
    _type: "datetimerange",
    label: "时间范围",
    prop: ["##datetimerange"],
    _prop: ["startDate", "endDate"],
    // disabledDate:'2020-04-1',
    format: "YYYY-MM-DD HH:mm:ss",
    placeholder: ["开始日期", "结束日期"],
  },
  {
    type: "input",
    label: "系统单号",
    prop: "orderSn",
    placeholder: "请输入系统单号",
  },
  {
    type: "input",
    label: "商户单号",
    prop: "outerSn",
    placeholder: "请输入商户单号",
  },

  {
    type: "select",
    label: "是否验单",
    prop: "validOrder",
    options: [
      {
        value: "是",
        id: 1,
      },
      {
        value: "否",
        id: 0,
      },
    ],
    placeholder: "请选择是否验单",
  },
  {
    type: "select",
    label: "状态",
    prop: "orderStatus",
    _url: "/orderChargeInfo/orderStatus",
    default_not_request: true,
  },
  {
    type: "select",
    label: "运营商",
    prop: "operatorCh",
    _url: "/orderChargeInfo/orderOperator",
    default_not_request: true,
  },
  {
    type: "input",
    label: "流水号",
    prop: "voucher",
    placeholder: "请输入流水号",
  },
  {
    type: "input",
    label: "手机号",
    prop: "phone",
    placeholder: "请输入手机号",
  },
];

const headers = [
  { label: "订单编号", prop: "orderSn" },
  { label: "手机号码", prop: "phone" },
  { label: "创建时间", prop: "createDate" },

  {
    label: "凭证",
    type: "slot",
    template: {
      default: "voucherImg",
    },
  },
  {
    label: "操作",
    type: "slot",
    template: {
      default: "operator",
    },
  },
];

const { loading, data, send, pages, onSuccess } = useAxios(waitValidOrderList, {
  defaultParams: ruleForm,
  immediate: true,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true,
});

const tableData = ref([]);
onSuccess((res) => {
  tableData.value = res.data.list;
});

const submit = (type) => {
  if (type == "form") pages.page = 1;
  send();
};
const resetForm = () => {
  data.value = [];
};

const orderDetailRef =ref(null)
// 获取验单详情
const { loading: OrderDetailLoading, send: OrderDetailSend, onSuccess: OrderDetailSuccess, onError: OrderDetailError } = useAxios(checkOrderDetail, {
  immediate: false,
});
OrderDetailSuccess(res =>{
  orderDetail.value = res.data
  orderDetailRef.value.on_init(orderDetail.value)
})
OrderDetailError(error=>{
  console.log(error);
})
const changeOrder = (row)=>{
  OrderDetailSend({id: row.id})
}
</script>

<template>
  <div>
    <div class="content content_form">
      <Tform
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        @resetForm="resetForm"
        inline
      ></Tform>
    </div>
    <div class="content">
      <!-- <span style="margin-left: 10px; font-size: 14px;"> 订单总金额：{{data.totalAmount}}  </span> -->
      <Ttable
        ref="TtableRef"
        :loading="loading"
        :headers="headers"
        :tableData="tableData"
        :pages="pages"
      >
        <template #voucherImg="{ scope }">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.voucherImg"
            :preview-src-list="[scope.row.voucherImg]"
            :preview-teleported="true"
          />
        </template>
        <template #operator="{ scope }">
          <el-button @click="changeOrder(scope.row)" type="primary" link>手工核验</el-button>
        </template>
      </Ttable>
    </div>
    <orderDetail ref="orderDetailRef" @submit="submit"/>
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>
