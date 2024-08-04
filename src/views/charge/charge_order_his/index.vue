<script setup>
import { reactive, ref } from "vue";
import { useAxios } from '@/hooks'
import Tform from "@/components/GiForm/index.vue";
import Ttable from "@/components/Templates/Ttable.vue";
import { openExport } from "@/hooks/export";
import { orderChargeInfoListHis, orderChargeInfoExportHis, chargeBuybackHis, orderChargeInfoDetailHis } from "@/api/index";
import cutdownTimer from '@/components/cutdownTimer.vue'
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
  { label: "创建时间", prop: "createDate" },
  { label: "系统单号", prop: "orderSn" },
  { label: "取单编号", prop: "platSn" },
  { label: "商户单号", prop: "outerSn" },
  { label: "手机号码", prop: "phone" },
  { label: "运营商", prop: "operatorCh" },
  { label: "接单用户", prop: "userName" },
  {
    label: "订单状态",
    type: "slot",
    template: {
      default: "orderStatusStr",
    },
  },
  { label: "完成时间", prop: "completeDate" },
  { label: "订单面值", prop: "par" },
  { label: "平台价", prop: "amount" },
  { label: "分润", prop: "inviteProfit" },
  { label: "结算价", prop: "settlePrice" },
  { label: "流水号", prop: "voucher" },
  {
    label: "是否验单",
    type: "slot",
    template: {
      default: "validOrder",
    },
  },
  {
    label: "验单结果",
    type: "slot",
    template: {
      default: "validOrderResult",
    },
  },
  { label: "上报时间", prop: "reportTime" },
  { label: "上报状态", prop: "reportState" },
  {
    label: "操作",
    type: "slot",
    template: {
      default: "operater",
    },
  },
  // {
  //   label: "超时时间",
  //   type: "slot",
  //   template: {
  //     default: "outTime",
  //   },
  // },
];

const { loading, data, send, pages, onSuccess } = useAxios(
  orderChargeInfoListHis,
  {
    defaultParams: ruleForm,
    immediate: true,
    data_deconstruction: (res) => res.data.list,
    total_deconstruction: (res) => res.data.total,
    isPages: true,
  }
);

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

const ComEditRef = ref();
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row);
};
const getStr = (type) => {
  switch (type) {
    case 0:
      return 'danger';
    case 1:
      return 'primary';
    case 2:
      return 'success';
    case 3:
      return 'warning';
    default:
      break;
  }
};

const open = () => {
  const data = {
    ...ruleForm,
    page: 0,
    size: 0,
  };
  openExport(orderChargeInfoExportHis, data);
};
const {
  loading: buybackLoading,
  send: buybackSend,
  onSuccess: buybackSuccess,
  onError: buybackError,
} = useAxios(chargeBuybackHis, {
  immediate: false,
});
buybackSuccess((res) => {
  ElNotification.success({
    title: "提示",
    message: res.message,
    duration: 3000,
  });
  send()
});
buybackError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.data.message,
    duration: 3000,
  });
});
// 返销
const buyBackOrder = (id) => {
  ElMessageBox.confirm("是否确认返销?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    buybackSend({id:id})
  });
};


// 订单详情
const orderDetailRef =ref(null)
// 获取验单详情
const { loading: OrderDetailLoading, send: OrderDetailSend, onSuccess: OrderDetailSuccess, onError: OrderDetailError } = useAxios(orderChargeInfoDetailHis, {
  immediate: false,
});
OrderDetailSuccess(res =>{
  orderDetailRef.value.on_init(res.data)
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
      <el-button type="primary" plain icon="Download" @click="open()"
        >导出数据</el-button
      >
      <!-- <span style="margin-left: 10px; font-size: 14px;"> 订单总金额：{{data.totalAmount}}  </span> -->
      <Ttable
        ref="TtableRef"
        :loading="loading"
        :headers="headers"
        :tableData="tableData"
        :pages="pages"
      >
        <template #orderStatusStr="{ scope }">
          <el-tag
            :type="getStr(scope.row.orderStatus)"
            >{{ scope.row.orderStatusStr }}</el-tag
          >
        </template>
        <template #validOrder="{ scope }">
          {{scope.row.validOrder? '是': '否'}}
        </template>
        <template #validOrderResult="{ scope }">
          {{scope.row.validOrderResult? '是': '否'}}
        </template>
        <template #operater="{ scope }">
          <el-button type="primary" link v-if="scope.row.orderStatus === 2" @click="buyBackOrder(scope.row.id)">返销</el-button>
          <el-button type="primary" link  @click="changeOrder(scope.row)" :loading="OrderDetailLoading">查看</el-button>
        </template>
        <template #outTime="{ scope }">
          <!-- <cutdownTimer :expireTime="scope.row.outTime" /> -->
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
