<script setup>
import { ref, reactive, toRaw, defineEmits, defineExpose, defineAsyncComponent } from "vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import Tform from "@/components/GiForm/index.vue";
import Tselect from "@/components/Templates/Tselect.vue";
import { useAxios } from '@/hooks'
import { setInterfaceProductAdd } from "@/api/index";


	const interfaceProductPreview = defineAsyncComponent(() => import('./interfaceProductPreview.vue'))
	

const emit = defineEmits();
let Update = reactive({
  title: "新增套餐配置",
  width: "580px",
  isShow: false,
  modal: true,
  draggable: true,
});
let previewTemModal = reactive({
  isShow: false,
  modal: true,
  draggable: true,
});

const _state = () => ({
  interfaceId: "",
  productName: "",
  cost: "",
  productId: "",
  productSn: "",
  par: "",
  price: "",
  profit: "",
  whiteAreas: "",
  blackAreas: "",
  enabled: false,
  voucherModel: "",
});

const ruleForm = reactive(_state());
const listInput = [
  {
    type: "input",
    label: "名称",
    prop: "productName",
    rules: { required: true, message: "请输入名称" },
  },
  {
    type: "input",
    label: "成本",
    prop: "cost",
    rules: { required: true, message: "请输入成本" },
  },
  {
    type: "input",
    label: "产品ID",
    prop: "productId",
    rules: { required: true, message: "请输入产品ID" },
  },
  {
    type: "input",
    label: "产品编码",
    prop: "productSn",
    rules: { required: true, message: "请输入产品编码" },
  },
  {
    type: "input",
    label: "面值",
    prop: "par",
    rules: { required: true, message: "请输入面值" },
  },
  {
    type: "input",
    label: "价格",
    prop: "price",
    rules: { required: true, message: "请输入价格" },
  },
  {
    type: "input",
    label: "固定利润",
    prop: "profit",
    rules: { required: true, message: "请输入固定利润" },
  },
  {
    type: "custom",
    prop: "enabled",
  },
  {
    type: "select",
    label: "允许地区",
    prop: "whiteAreas",
    _url: "/blackInfo/area",
    _value: "value",
    _label: "text",
    multiple: true,
    filterable: true,
    // rules: { required: true, message: '请选择运允许地区' },
  },
  {
    type: "select",
    label: "限制地区",
    prop: "blackAreas",
    _url: "/blackInfo/area",
    _value: "value",
    _label: "text",
    multiple: true,
    filterable: true,
    // rules: { required: true, message: '请选择运限制地区' },
  },
  {
    type: "custom",
    prop: "voucherModel",
  },
];
//open初始
const on_init = (row) => {
  row = toRaw(row);
  Update.isShow = true;
  Object.assign(ruleForm, _state());
  ruleForm.interfaceId = row["interfaceId"];
};
//关闭
const RefTform = ref(null);
const close = () => {
  RefTform.value?.resetForm();
};

const { loading, data, onSuccess, onError, send } = useAxios(
  setInterfaceProductAdd,
  {
    immediate: false,
  }
);
onSuccess((res) => {
  ElNotification.success({
    title: "提示",
    message: res.message || "新增成功!",
    duration: 3000,
  });
  emit("onSuccess");
  Update.isShow = false;
});
onError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.message || "新增失败！",
    duration: 3000,
  });
});

//提交
const submit = (type) => {
  send(ruleForm);
};
//确认
const confirm = () => {
  RefTform.value?.submitForm();
};
const selectChange = (value) => {
};
const interfaceProductPreviewRef = ref(null);
const previewTem = (value) => {
  if (!ruleForm.voucherModel) {
    ElNotification.warning({
      title: "提示",
      message: "请先选择模板类型",
      duration: 3000,
    });
	return false;
  }
  interfaceProductPreviewRef.value.on_init(ruleForm.voucherModel)
};
defineExpose({
  on_init,
});
</script>

<template>
  <Tdialog
    :Update="Update"
    :loading="loading"
    @confirm="confirm"
    @close="close"
  >
    <Tform
      ref="RefTform"
      :loading="loading"
      :ruleForm="ruleForm"
      :listInput="listInput"
      @submit="submit"
      label_width="120px"
      btn_hide
    >
      <template #enabled="scope">
        <el-form-item label="是否启用" prop="enabled" label-width="120px">
          <el-switch
            v-model="ruleForm.enabled"
            active-text="是"
            inactive-text="否"
            inline-prompt
          />
        </el-form-item>
      </template>
      <template #voucherModel="scope">
        <el-form-item label="选择模板" prop="voucherModel" label-width="120px" :rules="{required: true, message:'请选择模板'}">
          <Tselect
            :ruleForm="ruleForm"
            :listInput="{
              prop: 'voucherModel',
              options: [
                { id: 0, value: '默认' },
                { id: 1, value: '电信' },
                { id: 2, value: '移动' },
                { id: 3, value: '联通' },
              ],
              _value: 'id',
              _label: 'value',
              placeholder: '请选择订单模板',
            }"
            @selectChange="selectChange(scope.row, true)"
          />
          <el-button @click="previewTem" type="primary" style="margin-left:20px" v-if="ruleForm.voucherModel > 0">预览模板</el-button>
        </el-form-item>
      </template>
    </Tform>
	<interfaceProductPreview ref="interfaceProductPreviewRef"/>
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
