<script setup>
import { ref, reactive, defineEmits, defineExpose } from "vue";
import Tform from "@/components/GiForm/index.vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import { useAxios } from '@/hooks'
import { changeOrderStatus } from "@/api/index";

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
  ElNotification.success({
    title: "提示",
    message: res.message || "请求失败！",
    duration: 3000,
  });
  emit('submit')
  Update.isShow = false
});
changeError((error) => {
  ElNotification.error({
    title: "提示",
    message: error.data.message || "请求失败！",
    duration: 3000,
  });
});

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
        <el-descriptions-item label="下单时间">
          {{ orderInfo.order.createDate }}
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
      </el-descriptions>
      <el-form
        ref="formRef"
        :model="orderInfo.voucherInfo"
        :rules="orderInfo.voucherInfo.result ? rules : []"
      >
        <el-form-item label="核验结果" prop="result">
          <el-switch v-model="orderInfo.voucherInfo.result" inline-prompt />
        </el-form-item>
        <el-form-item label="凭证号码" prop="phone">
          <el-input
            v-model="orderInfo.voucherInfo.phone"
            :disabled="!orderInfo.voucherInfo.result"
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
            :disabled="!orderInfo.voucherInfo.result"
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
