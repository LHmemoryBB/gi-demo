<script setup>
import { ref, reactive, defineEmits, defineExpose } from "vue";
import Tform from "@/components/Templates/Tform.vue";
import Tdialog from "@/components/Templates/Tdialog.vue";

const emit = defineEmits();
let Update = reactive({
  title: "订单详情",
  width: "1200px",
  isShow: false,
  modal: true,
  draggable: true,
});
const orderInfo = ref({});
const on_init = (data) => {
  orderInfo.value = data;
  Update.isShow = true;
};

const getStr = (type) => {
  switch (type) {
    case 0:
      return 'red';
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'orange';
    default:
      break;
  }
};

function submit(params) {
    Update.isShow = false
}
defineExpose({
  on_init,
});
</script>

<template>
  <Tdialog :Update="Update" :className="'rule-dialog'" @confirm="submit">
    <div>
      <a-descriptions
        title="订单信息"
        border
        :column="2"
        style="margin-bottom: 20px"
      >
        <a-descriptions-item label="订单编号">
          {{ orderInfo.order.orderSn }}
        </a-descriptions-item>
        <a-descriptions-item label="取单编号">
          {{ orderInfo.order.platSn }}
        </a-descriptions-item>
        <a-descriptions-item label="下单时间">
          {{ orderInfo.order.createDate }}
        </a-descriptions-item>
        <a-descriptions-item label="完成时间">
          {{ orderInfo.order.completeDate }}
        </a-descriptions-item>
        <a-descriptions-item label="充值号码">{{
          orderInfo.order.phone
        }}</a-descriptions-item>
        <a-descriptions-item label="运营商">{{
          orderInfo.order.operatorCh
        }}</a-descriptions-item>
        <a-descriptions-item label="面值">
          {{ orderInfo.order.par }}
        </a-descriptions-item>
        <a-descriptions-item label="接单用户">
          {{ orderInfo.order.userName }}
        </a-descriptions-item>
        <a-descriptions-item label="订单状态">
          <a-tag
            v-if="orderInfo.order.orderStatusStr"
            :type="getStr(orderInfo.order.orderStatus)"
            >{{ orderInfo.order.orderStatusStr }}</a-tag
          >
        </a-descriptions-item>
        <a-descriptions-item label="流水">
          {{ orderInfo.order.voucher }}
        </a-descriptions-item>
        <a-descriptions-item label="是否验单">
          {{orderInfo.order.validOrder? '是': '否'}}
        </a-descriptions-item>
        <a-descriptions-item label="验单结果">
          {{ orderInfo.order.validOrderResult ? '通过': '未通过' }}
        </a-descriptions-item>
        <a-descriptions-item label="上报时间">
          {{ orderInfo.order.reportTime }}
        </a-descriptions-item>
        <a-descriptions-item label="上报状态">
          {{ orderInfo.order.reportState? '成功': '失败' }}
        </a-descriptions-item>
      </a-descriptions>
      <a-form
        ref="formRef"
        :model="orderInfo.voucherInfo"
        v-if="orderInfo.voucherInfo"
      >
        <a-form-item label="凭证号码" prop="voucherPhone">
          <a-input
            v-model:value="orderInfo.voucherInfo.voucherPhone"
            disabled
            style="width: 300px"
          ></a-input>
        </a-form-item>
        <a-form-item label="凭证结果" prop="voucherRes">
          <a-input
            v-model:value="orderInfo.voucherInfo.voucherRes"
            style="width: 300px"
            :disabled="true"
          ></a-input>
        </a-form-item>
        <a-form-item label="凭证流水" prop="voucher">
          <a-input
            v-model:value="orderInfo.voucherInfo.voucher"
            disabled
            style="width: 300px"
          ></a-input>
        </a-form-item>
        <a-form-item label="凭证图片" prop="voucherImg">
          <a-image
            style="width: 100px"
            :src="orderInfo.voucherInfo.voucherImg"
            fit="cover"
          />
        </a-form-item>
      </a-form>
    </div>
  </Tdialog>
</template>

<style lang="scss" scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
</style>
