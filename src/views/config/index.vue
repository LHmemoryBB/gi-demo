<script setup>
import { ref, reactive, toRaw, defineAsyncComponent } from "vue";
import Tform from "@/components/Templates/Tform.vue";
import TuploadImg from "@/components/Templates/TuploadImg.vue";
import TuploadPdf from "@/components/Templates/TuploadPdf.vue";
import { useAxios } from '@/hooks'
import { notification } from 'ant-design-vue';

import {
  up_singleImg,
  up_singlePdf,
  getConfigDetail,
  setConfigUpdate,
} from "@/api/index";

const _state = () => ({
  domainName: "",
  companyName: "",
  customerPhone: "",
  id: 1,
  logo: [],
  officialAccount: [],
  businessAccount: [],
  apiPdf: [],
  platformName: "",
  recordNumber: "",
  gaRecordNumber: "",
  xkRecordNumber: "",
});
const ruleForm = reactive(_state());
const listInput = [
  {
    type: "input",
    label: "域名",
    prop: "domainName",
    rules: { required: true, message: "请输入域名" },
  },
  {
    type: "input",
    label: "公司名称",
    prop: "companyName",
    rules: { required: true, message: "请输入公司名称" },
  },
  {
    type: "input",
    label: "客服电话",
    prop: "customerPhone",
    rules: { required: true, message: "请输入客服电话" },
  },
  {
    type: "custom",
    prop: "logo",
  },
  {
    type: "custom",
    prop: "officialAccount",
  },
  {
    type: "custom",
    prop: "businessAccount",
  },
  {
    type: "custom",
    prop: "apiPdf",
  },
  {
    type: "input",
    label: "平台名称",
    prop: "platformName",
    rules: { required: true, message: "请输入平台名称" },
  },
  {
    type: "input",
    label: "网站备案号",
    prop: "recordNumber",
    rules: { required: true, message: "请输入网站备案号" },
  },
  {
    type: "input",
    label: "公安备案号",
    prop: "gaRecordNumber",
    rules: { required: true, message: "请输入公安备案号" },
  },
  {
    type: "input",
    label: "许可证备案号",
    prop: "xkRecordNumber",
    rules: { required: true, message: "请输入许可证备案号" },
  },
];
const {
  loading: loadingDetail,
  onSuccess: onSuccessDetail,
  onError: onErrorDetail,
  send: sendDetail,
} = useAxios(getConfigDetail, {
  immediate: false,
});

//初始
let showDetail = ref(false)
const on_init = () => {
  sendDetail();
  onSuccessDetail((res) => {
    for (let keys in ruleForm) {
      if (
        ["logo", "officialAccount", "businessAccount", "apiPdf"].includes(keys)
      ) {
        ruleForm[keys] = [];
      } else {
        ruleForm[keys] = res.data[keys] ?? "";
      }
    }
    if ("" != res.data.logo) {
      ruleForm.logo = [
        {
          name: res.data.logo ?? "",
          uid: res.data.logo ?? "",
          url: res.data.logo ?? "",
          response: [res.data.logo ?? ""],
        },
      ];
    }
    if ("" != res.data.officialAccount) {
      ruleForm.officialAccount = [
        {
          name: res.data.officialAccount ?? "",
          uid: res.data.officialAccount ?? "",
          url: res.data.officialAccount ?? "",
          response: [res.data.officialAccount ?? ""],
        },
      ];
    }
    if ("" != res.data.businessAccount) {
      ruleForm.businessAccount = [
        {
          name: res.data.businessAccount ?? "",
          uid: res.data.businessAccount ?? "",
          url: res.data.businessAccount ?? "",
          response: [res.data.businessAccount ?? ""],
        },
      ];
    }
    if ("" != res.data.apiPdf) {
      ruleForm.apiPdf = [
        {
          name: res.data.apiPdf ?? "",
          uid: res.data.apiPdf ?? "",
          url: res.data.apiPdf ?? "",
          response: [res.data.apiPdf ?? ""],
        },
      ];
    }
    showDetail.value = true
  });
  onErrorDetail((res) => {
    notification.error({
      message: "提示",
      description: res.message || "数据异常！",
      duration: 3,
    });
  });
};
on_init();

//关闭
const RefTform = ref(null);
const close = () => {
  RefTform.value?.resetForm();
};

const { loading, data, onSuccess, onError, send } = useAxios(setConfigUpdate, {
  immediate: false,
});
onSuccess((res) => {
  notification.success({
    message: "提示",
    description: res.message || "修改成功!",
    duration: 3,
  });
});
onError((res) => {
  notification.error({
    message: "提示",
    description: res.message || "修改失败！",
    duration: 3,
  });
});

//提交
const submit = (type) => {  
  let data = {
    ...ruleForm,
    logo: ruleForm.logo[0].response.data ?? ruleForm.logo[0].response[0],
    officialAccount:
      ruleForm.officialAccount[0].response.data ??
      ruleForm.officialAccount[0].response[0],
    businessAccount:
      ruleForm.businessAccount[0].response.data ??
      ruleForm.businessAccount[0].response[0],
    apiPdf: ruleForm.apiPdf[0].response.data ?? ruleForm.apiPdf[0].response[0],
  };
  send(data);
};

//确认
const confirm = () => {
  RefTform.value?.submitForm();
};

//上传
const pathSuccess = (response, file, fileList, keys) => {
  ruleForm[keys] = fileList;
};

//删除
const pathRemove = (file,keys) => {
  ruleForm[keys] = ruleForm[keys].filter(item => item.uid !== file.uid)
};
</script>

<template>
  <div>
    <div class="page-container">
      <div class="table-container">
        <Tform
        v-if="showDetail"
        ref="RefTform"
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        label_width="120px"
        querytext="修改"
      >
        <template #logo="scope">
          <a-form-item
            label="用户头像"
            :name="'logo'"
            :rules="{ required: true, message: '请添加图片' }"
            label-width="120px"
          >
          
            <TuploadImg
              :up_img_api="up_singleImg"
              :fileList="ruleForm.logo"
              :size="1024 * 1024"
              sizeName="1MB"
              :limit="1"
              multiple
              @pathSuccess="
                (response, file, fileList) =>
                  pathSuccess(response, file, fileList, 'logo')
              "
              @pathRemove="
                (file) => pathRemove(file, 'logo')
              "
            ></TuploadImg>
          </a-form-item>
        </template>
        <template #officialAccount="scope">
          <a-form-item
            label="公众号"
            :name="'officialAccount'"
            :rules="{ required: true, message: '请添加图片' }"
            label-width="120px"
          >
            <TuploadImg
              :up_img_api="up_singleImg"
              :fileList="ruleForm.officialAccount"
              :size="1024 * 1024"
              sizeName="1MB"
              :limit="1"
              multiple
              @pathSuccess="
                (response, file, fileList) =>
                  pathSuccess(response, file, fileList, 'officialAccount')
              "
              @pathRemove="
                (file) =>
                  pathRemove(file, 'officialAccount')
              "
            ></TuploadImg>
          </a-form-item>
        </template>
        <template #businessAccount="scope">
          <a-form-item
            label="商户号"
            :name="'businessAccount'"
            :rules="{ required: true, message: '请添加图片' }"
            label-width="120px"
          >
            <TuploadImg
              :up_img_api="up_singleImg"
              :fileList="ruleForm.businessAccount"
              :size="1024 * 1024"
              sizeName="1MB"
              :limit="1"
              multiple
              @pathSuccess="
                (response, file, fileList) =>
                  pathSuccess(response, file, fileList, 'businessAccount')
              "
              @pathRemove="
                (file) =>
                  pathRemove(file, 'businessAccount')
              "
            ></TuploadImg>
          </a-form-item>
        </template>
        <template #apiPdf="scope">
          <a-form-item
            label="API文档"
            :name="'apiPdf'"
            :rules="{ required: true, message: '请上传pdf文件' }"
            label-width="120px"
          >
            <TuploadPdf
              :action="up_singlePdf"
              :fileList="ruleForm.apiPdf"
              @pathSuccess="
                (response, file, fileList) =>
                  pathSuccess(response, file, fileList, 'apiPdf')
              "
              @pathRemove="
                (file) => pathRemove(file, 'apiPdf')
              "
            ></TuploadPdf>
          </a-form-item>
        </template>
      </Tform>
      </div>
    </div>
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
