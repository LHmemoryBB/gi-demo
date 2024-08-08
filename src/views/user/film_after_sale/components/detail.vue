<script setup>
import { ref, reactive, defineEmits, defineExpose } from "vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import Tform from "@/components/Templates/Tform.vue";
import { useAxios } from "@/hooks";
import { AfterSaleDetail, AfterSaleApproved } from "@/api/index";
const emit = defineEmits(["onSuccess"]);

let Approval = reactive({
  title: "详情",
  width: "70%",
  isShow: false,
  modal: true,
  draggable: true,
});
const ruleForm = reactive({
  //   userId: "",
  approveType: null,
});
const listInput = ref([]);
let orderInfo = ref({});
let loading = ref(false);

const {
  data,
  onSuccess,
  onError,
  send: getOrderDetail,
} = useAxios(AfterSaleDetail, {
  immediate: false,
});
onSuccess((res) => {
  orderInfo.value = res.data;
  orderInfo.value.voucherInfo = JSON.parse(orderInfo.value.voucherInfo);
  orderInfo.value.selectSeatInfo = JSON.parse(orderInfo.value.selectSeatInfo);
  listInput.value = [
    {
      type: "radio",
      label: "处理结果选择",
      prop: "approveType",
      _url: `/filmAfterSaleApply/dealResult?status=${orderInfo.value.beforeOrderStatus}`,
      _value: "id",
      _label: "value",
      filterable: true,
      // immediate: false,
      default_not_request: true,
      rules: { required: true, message: "请选择处理结果选择" },
    },
    {
      type: "textarea",
      label: "备注",
      prop: "remark",
      length: 300,
    },
  ];
  loading.value = false;
  Approval.isShow = true;
});
onError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.message || "请求失败！",
    duration: 3000,
  });
});
const {
  onSuccess: submitSuccess,
  onError: submitError,
  send: submitApproval,
} = useAxios(AfterSaleApproved, {
  immediate: false,
});
submitSuccess((res) => {
  ElNotification.success({
    title: "提示",
    message: res.message || "请求成功!",
    duration: 3000,
  });
  emit("onSuccess");
  Approval.isShow = false;
});
submitError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.message || "请求失败！",
    duration: 3000,
  });
});

//open初始
const on_init = (row) => {
  loading.value = true;
  getOrderDetail({ id: row.id });
};
//关闭
const RefTform = ref(null);
const close = () => {
  RefTform.value?.resetForm();
};

//提交
const submit = (type) => {
  const data = {
    id: orderInfo.value.id,
    amount: orderInfo.value.amount,
    applyUser: orderInfo.value.applyUser,
    filmOrderSn: orderInfo.value.filmOrderSn,
    reportUser: orderInfo.value.userId,
  };
  submitApproval({ ...ruleForm, ...data });
};
//确认
const confirm = () => {
  RefTform.value?.submitForm();
};

defineExpose({
  on_init,
});
</script>

<template>
  <Tdialog
    :Update="Approval"
    :loading="loading"
    @confirm="confirm"
    @close="close"
  >
    <div class="content">
      <div class="discription-img">
        <div class="order-img">
          <img :src="orderInfo.causeImg" alt="" />
          <!-- <img :src="orderInfo.movieImg"  alt="" /> -->
        </div>

        <a-descriptions class="margin-top" title="售后信息" :column="2" border>
          <a-descriptions-item label="售后原因">
            {{ orderInfo.cause }}
          </a-descriptions-item>
          <a-descriptions-item label="申请人">
            {{ orderInfo.applyUserName }}
          </a-descriptions-item>
          <a-descriptions-item label="售后类型">
            {{ orderInfo.causeTypeStr }}
          </a-descriptions-item>
          <a-descriptions-item label="售后前订单状态">
            {{ orderInfo.beforeOrderStatusStr }}
          </a-descriptions-item>
          <a-descriptions-item label="售后状态">
            {{ orderInfo.afterSaleStatusStr }}
          </a-descriptions-item>
          <a-descriptions-item label="待处理">
            {{ orderInfo.completed ? "是" : "否" }}
          </a-descriptions-item>
          <a-descriptions-item label="处理结果" span="2">
            {{ orderInfo.approveType }}
          </a-descriptions-item>
          <a-descriptions-item label="备注" span="2">
            {{ orderInfo.remark }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="discription-img">
        <div class="order-img">
          <img :src="orderInfo.movieImg" alt="" />
        </div>
        <a-descriptions class="margin-top" title="订单信息" :column="2" border>
          <a-descriptions-item label="电影名称">{{
            orderInfo.movieName
          }}</a-descriptions-item>
          <a-descriptions-item label="语言类型">{{
            orderInfo.langDim
          }}</a-descriptions-item>
          <a-descriptions-item label="放映时间"
            >{{ orderInfo.timeTag }}（{{ orderInfo.showTime }} -
            {{ orderInfo.endTime }}）</a-descriptions-item
          >
          <a-descriptions-item label="场次编码">{{
            orderInfo.seqNo
          }}</a-descriptions-item>
          <a-descriptions-item label="已结算">{{
            orderInfo.settled ? "是" : "否"
          }}</a-descriptions-item>
          <a-descriptions-item label="结算时间">{{
            orderInfo.settlementDate
          }}</a-descriptions-item>
          <a-descriptions-item label="城市名称">{{
            orderInfo.cityName
          }}</a-descriptions-item>
          <a-descriptions-item label="影院名称">{{
            orderInfo.cinemaName
          }}</a-descriptions-item>
          <a-descriptions-item label="影院地址" span="2">{{
            orderInfo.cinemaAddr
          }}</a-descriptions-item>
          <a-descriptions-item label="影厅类型">{{
            orderInfo.hallTypeName
          }}</a-descriptions-item>
          <a-descriptions-item label="影厅名称">{{
            orderInfo.hallName
          }}</a-descriptions-item>
          <a-descriptions-item label="可调座">{{
            orderInfo.acceptAdjustSeats ? "是" : "否"
          }}</a-descriptions-item>
          <a-descriptions-item label="订单编号">{{
            orderInfo.filmOrderSn
          }}</a-descriptions-item>
          <a-descriptions-item label="外部单号">{{
            orderInfo.filmOutOrderSn
          }}</a-descriptions-item>
          <a-descriptions-item label="订单状态">{{
            orderInfo.status
          }}</a-descriptions-item>
          <a-descriptions-item label="手机号">{{
            orderInfo.phone
          }}</a-descriptions-item>
          <a-descriptions-item label="市场价">{{
            orderInfo.price
          }}</a-descriptions-item>
          <a-descriptions-item label="平台价">{{
            orderInfo.amount
          }}</a-descriptions-item>
          <a-descriptions-item label="最高限价">{{
            orderInfo.maxLimitPrice
          }}</a-descriptions-item>
          <a-descriptions-item label="报价人数">{{
            orderInfo.quoteNum
          }}</a-descriptions-item>
          <a-descriptions-item label="计费模式">{{
            orderInfo.chargeTypeStr
          }}</a-descriptions-item>

          <a-descriptions-item label="报价结果选择">{{
            orderInfo.quoteType ? orderInfo.quoteType : "暂无"
          }}</a-descriptions-item>
          <a-descriptions-item label="影票数量">{{
            orderInfo.quantity
          }}</a-descriptions-item>
          <a-descriptions-item label="座位信息" span="2">
            <div class="seat-list">
              <div
                v-for="(seat, index) in orderInfo.selectSeatInfo"
                :key="index"
                class="seat"
              >
                <a-tag type="primary"
                  >{{ seat.rowNum }}排{{ seat.columnId }}座
                </a-tag>
                <a-tag type="success" style="margin: 0 10px"
                  >{{ seat.price }}元</a-tag
                >
                <a-tag type="danger">{{
                  seat.loved ? "情侣座" : seat.sectionName
                }}</a-tag>
              </div>
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="discription-img">
        <div class="order-img">
          <img :src="orderInfo.voucherImg" alt="" />
        </div>
        <a-descriptions class="margin-top" title="凭证信息" :column="2" border>
          <a-descriptions-item label="售后原因" span="2">
            {{ orderInfo.cause }}
          </a-descriptions-item>
          <a-descriptions-item label="上报信息">
            <div>二维码信息：{{ orderInfo.voucherInfo.qrcode }}</div>
            <div>其他信息：{{ orderInfo.voucherInfo.info }}</div>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="after_sale_select">
        <Tform
          ref="RefTform"
          :ruleForm="ruleForm"
          :listInput="listInput"
          btn_hide
          label_width="150px"
          @submit="submit"
        >
        </Tform>
      </div>
    </div>
  </Tdialog>
</template>

<style lang="scss" scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
.fixed_width {
  display: flex;
  flex-direction: column;
}
.after_sale_select {
  margin-top: 20px;
}
.discription-img {
  display: flex;
  justify-content: space-between;
}
.discription-img {
  .seat-list {
    display: flex;
    flex-wrap: wrap;
    .seat {
      margin: 4px;
      // border-right: 1px solid #888888;
      padding-right: 10px;
    }
  }
  :deep(.a-descriptions) {
    width: calc(100% - 160px) !important;
    .a-descriptions__label.a-descriptions__cell.is-bordered-label {
      width: 130px;
    }
    .a-descriptions__content.a-descriptions__cell.is-bordered-content {
      width: 350px;
    }
  }
}
.discription-img :deep(.a-descriptions) {
  width: calc(100% - 160px) !important;
}
.order-img {
  height: 200px;
  margin-top: 42px;
  img {
    height: 100%;
  }
}
</style>
