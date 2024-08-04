<script setup>
import { ref, reactive, defineEmits, defineExpose } from "vue";
import Tform from "@/components/GiForm/index.vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import { useAxios } from '@/hooks'
import { changeOrderStatus } from "@/api/index";

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

const {
  loading: changeLoading,
  send: changeSend,
  onError: changeError,
  onSuccess: changeSuccess,
} = useAxios(changeOrderStatus, {
  immediate: false,
});

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
      <el-descriptions
        title="订单信息"
        border
        :column="2"
        style="margin-bottom: 20px"
      >
        <el-descriptions-item label="订单编号">
          {{ orderInfo.order.orderSn }}
        </el-descriptions-item>
        <el-descriptions-item label="取单编号">
          {{ orderInfo.order.platSn }}
        </el-descriptions-item>
        <el-descriptions-item label="下单时间">
          {{ orderInfo.order.createDate }}
        </el-descriptions-item>
        <el-descriptions-item label="完成时间">
          {{ orderInfo.order.completeDate }}
        </el-descriptions-item>
        <el-descriptions-item label="充值号码">{{
          orderInfo.order.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="运营商">{{
          orderInfo.order.operatorCh
        }}</el-descriptions-item>
        <el-descriptions-item label="面值">
          {{ orderInfo.order.par }}
        </el-descriptions-item>
        <el-descriptions-item label="接单用户">
          {{ orderInfo.order.userName }}
        </el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag
            v-if="orderInfo.order.orderStatusStr"
            :type="getStr(orderInfo.order.orderStatus)"
            >{{ orderInfo.order.orderStatusStr }}</el-tag
          >
        </el-descriptions-item>
        <el-descriptions-item label="流水">
          {{ orderInfo.order.voucher }}
        </el-descriptions-item>
        <el-descriptions-item label="是否验单">
          {{orderInfo.order.validOrder? '是': '否'}}
        </el-descriptions-item>
        <el-descriptions-item label="验单结果">
          {{ orderInfo.order.validOrderResult ? '通过': '未通过' }}
        </el-descriptions-item>
        <el-descriptions-item label="上报时间">
          {{ orderInfo.order.reportTime }}
        </el-descriptions-item>
        <el-descriptions-item label="上报状态">
          {{ orderInfo.order.reportState? '成功': '失败' }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="formRef"
        :model="orderInfo.voucherInfo"
        v-if="orderInfo.voucherInfo"
      >
        <el-form-item label="凭证号码" prop="phone">
          <el-input
            v-model="orderInfo.voucherInfo.phone"
            disabled
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="凭证结果" prop="voucherRes">
          <el-input
            v-model="orderInfo.voucherInfo.voucherRes"
            style="width: 300px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="凭证流水" prop="voucher">
          <el-input
            v-model="orderInfo.voucherInfo.voucher"
            disabled
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="凭证图片" prop="voucherImg">
          <el-image
            style="width: 100px"
            :src="orderInfo.voucherInfo.voucherImg"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[orderInfo.voucherInfo.voucherImg]"
            :initial-index="4"
            fit="cover"
          />
        </el-form-item>
      </el-form>
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
