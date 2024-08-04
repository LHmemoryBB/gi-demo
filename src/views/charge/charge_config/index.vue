<script setup>
import { ref, reactive, toRaw, defineAsyncComponent } from "vue";
import Tform from "@/components/GiForm/index.vue";
import TuploadPdf from "@/components/GiUpload/fileUpload.vue";
import { useAxios } from '@/hooks'
import {
  up_singlePdf,
  getChargeInfoDetail,
  setChargeUpdate,
} from "@/api/index";
const ComChargeDetail = defineAsyncComponent(() =>
  import("./charge_info/chargeDetail.vue")
);

const _state = () => ({
  id: 1,
  chargeName: "",
  useCk: false,
  enabled: true,
});
const ruleForm = reactive(_state());
const listInput = [
  {
    type: "input",
    label: "活动名称",
    prop: "chargeName",
    rules: { required: true, message: "请输入活动名称" },
  },
  {
    type: "custom",
    prop: "enabled",
  }
];
const {
  loading: loadingDetail,
  onSuccess: onSuccessDetail,
  onError: onErrorDetail,
  send: sendDetail,
} = useAxios(getChargeInfoDetail, {
  immediate: false,
});

//初始
const on_init = () => {
  sendDetail();
  onSuccessDetail((res) => {
    if (res.data?.id) {
      for (let keys in ruleForm) {
          ruleForm[keys] = res.data[keys] ?? "";
      }
    }
  });
  onErrorDetail((res) => {
    ElNotification.error({
      title: "提示",
      message: res.message || "数据异常！",
      duration: 3000,
    });
  });
};
on_init();

//关闭
const RefTform = ref(null);
const close = () => {
  RefTform.value?.resetForm();
};

const { loading, data, onSuccess, onError, send } = useAxios(setChargeUpdate, {
  immediate: false,
});
onSuccess((res) => {
  ElNotification.success({
    title: "提示",
    message: res.message || "修改成功!",
    duration: 3000,
  });
});
onError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.message || "修改失败！",
    duration: 3000,
  });
});

//提交
const submit = (type) => {
  let data = {
    ...ruleForm
  };
  send(data);
};

//确认
const confirm = () => {
  RefTform.value?.submitForm();
};

const ComChargeDetailRef = ref();
const onComChargeDetail = (row) => {
  ruleForm.chargeId = ruleForm.id;
  ComChargeDetailRef.value?.on_init(ruleForm);
};
</script>

<template>
  <div>
    <div class="content content_form">
      <Tform
        ref="RefTform"
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        label_width="120px"
        querytext="修改"
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
        <template #operation="scope">
          <el-button type="success" @click="onComChargeDetail()"
            >详情配置</el-button
          >
        </template>
      </Tform>
    </div>
    <ComChargeDetail ref="ComChargeDetailRef" />
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
.label-div {
  width: 120px;
  height: 32px;
  line-height: 32px;
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 0 0 auto;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.editor-div {
  width: 840px;
  margin-left: 120px;
  margin-bottom: 20px;
}
</style>
