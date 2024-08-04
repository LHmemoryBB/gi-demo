<script setup>
import { ref, reactive, defineExpose, defineAsyncComponent } from "vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import Tform from "@/components/GiForm/index.vue";
import Tselect from "@/components/Templates/Tselect.vue";
import { setInterfaceProductAdd } from "@/api/index";

const dianxin = defineAsyncComponent(() =>
  import("@/components/orderTemplate/dianxin.vue")
);
const yidong = defineAsyncComponent(() =>
  import("@/components/orderTemplate/yidong.vue")
);
const liantong = defineAsyncComponent(() =>
  import("@/components/orderTemplate/liantong.vue")
);

let Update = reactive({
  isShow: false,
  modal: false,
  draggable: true,
    width: '390px'
});

let voucherModel = ref("");
let orderInfo = ref({
  orderStatus: 2,
  phone: '1532743xxxx',
  par: '30',
  pushDate: '2024.07.10 10:00:00',
  voucher: '612048333967940195'
});
//open初始
const on_init = (row, order) => {
  voucherModel.value = row;
  Update.isShow = true;
  if (order?.id) {
    orderInfo.value = order
  }
};
defineExpose({
  on_init,
});
</script>

<template>
  <div class="dialog-container">
    <Tdialog :Update="Update" footer_hide className="preivewTempDialog">
      <div>
        <dianxin :orderInfo="orderInfo" v-if="voucherModel == '1'" />
        <yidong :orderInfo="orderInfo" v-if="voucherModel == '2'" />
        <liantong :orderInfo="orderInfo" v-if="voucherModel == '3'" />
      </div>
    </Tdialog>
  </div>
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
<style>
/* .preivewTempDialog {
  background: red;
} */
.preivewTempDialog .el-dialog__header{
display: none;
}
.preivewTempDialog .el-dialog__body{
padding: 0;
}
</style>
