<script setup>
import { ref, reactive, defineEmits, defineExpose } from "vue";
import Tform from "@/components/Templates/Tform.vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import {useAxios} from "@/hooks";
import { changeOrderStatus } from "@/api/index";
import { notification } from 'ant-design-vue'
const emit = defineEmits();
const rules = reactive({
  phone: [{ required: true, message: "请填写凭证号码", trigger: "blur" }],
  voucher: [{ required: true, message: "请填写凭证流水", trigger: "blur" }],
//   addResult: [{ required: true, message: "请填写凭证结果", trigger: "blur" }],
});
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

const formRef = ref(null);
const submit = async () => {
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      const data = {
        voucherId: orderInfo.value.voucherInfo.id,
        phone: orderInfo.value.voucherInfo.phone,
        result: orderInfo.value.voucherInfo.result,
        voucher: orderInfo.value.voucherInfo.voucher,
        orderId: orderInfo.value.order.id,
      };
      changeSend(data);
    } else {
      ElMessage.warning("请完善信息");
    }
  });
};
changeSuccess((res) => {
  notification.success({
    message: "提示",
    description: res.message || "请求失败！",
  });
  emit('submit')
  Update.isShow = false
});
changeError((error) => {
  notification.error({
    message: "提示",
    description: error.data.message || "请求失败！",
  });
});

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
        <a-descriptions-item label="下单时间">
          {{ orderInfo.order.createDate }}
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
      </a-descriptions>
      <a-form
        ref="formRef"
        :model="orderInfo.voucherInfo"
        :rules="orderInfo.voucherInfo.result ? rules : []"
      >
        <a-form-item label="核验结果" name="result">
          <a-switch v-model="orderInfo.voucherInfo.result"  />
        </a-form-item>
        <a-form-item label="凭证号码" name="voucherPhone">
          <a-input
            v-model:value="orderInfo.voucherInfo.voucherPhone"
            :disabled="!orderInfo.voucherInfo.result"
            style="width: 300px"
          ></a-input>
        </a-form-item>
        <a-form-item label="凭证结果" name="voucherRes">
			<!-- :disabled="true" -->
          <a-input
            v-model:value="orderInfo.voucherInfo.voucherRes"
            style="width: 300px"
            :disabled="!orderInfo.voucherInfo.result"
          ></a-input>
        </a-form-item>
        <a-form-item label="凭证流水" name="voucher">
          <a-input
            v-model:value="orderInfo.voucherInfo.voucher"
            :disabled="!orderInfo.voucherInfo.result"
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
