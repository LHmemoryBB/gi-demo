<script setup>
import {
  ref,
  reactive,
  defineAsyncComponent,
  defineEmits,
  defineExpose,
} from "vue";
import { useAxios } from '@/hooks'
import Tdialog from "@/components/Templates/Tdialog.vue";
import {
  getChargeDetail,
  setChargeDetailDel,
  setChargeDetailDetail,
} from "@/api/index";
import Tform from "@/components/GiForm/index.vue";
import Ttable from "@/components/Templates/Ttable.vue";
import { openDel } from "@/hooks/_del";

const ComAdd = defineAsyncComponent(() => import("./charge_detail/add.vue"));
const ComEdit = defineAsyncComponent(() => import("./charge_detail/edit.vue"));

const emit = defineEmits();
let Update = reactive({
  title: "详情配置",
  width: "1000px",
  isShow: false,
  modal: false,
  draggable: false,
});

const _state = () => ({
  chargeId: "",
  channelValue: "",
  channelName: "",
});

let ruleForm = reactive(_state());

const listInput = [
  // {
  //   type: "input",
  //   label: "渠道标识",
  //   prop: "channelValue",
  //   placeholder: "请输入渠道标识",
  // },
  {
    type: "input",
    label: "渠道名称",
    prop: "channelName",
    placeholder: "请输入渠道名称",
  },
];

const headers = [
  {
    label: "渠道名称",
    prop: "channelName",
  },
  // {
  //   label: "渠道标识",
  //   prop: "channelValue",
  // },
  {
    type: "slot",
    label: "渠道图片",
    template: {
      default: "channelImg",
    },
  },
  // {
  //   type: "slot",
  //   label: "开启运营商",
  //   template: {
  //     default: "useOperator",
  //   },
  // },
  {
    type: "slot",
    label: "开启省份",
    template: {
      default: "useCity",
    },
  },
  {
    type: "slot",
    label: "随机面值",
    template: {
      default: "useRandomPar",
    },
  },
  {
    type: "slot",
    label: "操作",
    template: {
      default: "operation",
    },
  },
];

const { loading, send, data, pages } = useAxios(getChargeDetail, {
  defaultParams: ruleForm,
  immediate: false,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true,
});

//open初始
const on_init = (row) => {
  Update.isShow = true;
  ruleForm = Object.assign(_state(), row);
  ruleForm.categoryCode = row.categoryCode;
  send();
};

//关闭
const close = () => {
  data.value = [];
};

const submit = (type) => {
  if (type == "form") pages.value.page = 1;
  send();
};

const resetForm = () => {
  Object.assign(ruleForm, _state());
  data.value = [];
};

const ComAddRef = ref();
const onComAdd = (ruleform) => {
  ComAddRef.value?.on_init(ruleform, "add");
};

const ComEditRef = ref();
const onComEdit = (row) => {
  ChargeDetailSend({ id: row.id });
};
const {
  loading: editLoading,
  onSuccess: ChargeDetailSuccess,
  onError: ChargeDetailError,
  send: ChargeDetailSend,
} = useAxios(setChargeDetailDetail, {
  defaultParams: ruleForm,
  immediate: false,
  data_deconstruction: (res) => res.data.list,
  total_deconstruction: (res) => res.data.total,
  isPages: true,
});
ChargeDetailSuccess((res) => {
  let data = res.data;
  data.channelImg = [
    {
      name: data.channelImg ?? "",
      uid: data.channelImg ?? "",
      url: data.channelImg ?? "",
      response: [data.channelImg ?? ""],
    },
  ];
  ComEditRef.value?.on_init(data, "edit");
});
ChargeDetailError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.message || "查询失败！",
    duration: 3000,
  });
});
const onComDel = (row) => {
  openDel(setChargeDetailDel, { id: row.id }).then(() => {
    submit("form");
  });
};

defineExpose({
  on_init,
});
</script>

<template>
  <Tdialog :Update="Update" @close="close" footer_hide>
    <Tform
      :loading="loading"
      :ruleForm="ruleForm"
      :listInput="listInput"
      @submit="submit"
      @resetForm="resetForm"
      inline
    ></Tform>
    <el-button type="primary" @click="onComAdd(ruleForm)">新增</el-button>
    <Ttable
      :loading="loading"
      :headers="headers"
      :tableData="data"
      :pages="pages"
    >
      <template #channelImg="{ scope }">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.channelImg"
          fit
        />
      </template>
      <template #useOperator="{ scope }">
        <el-tag
          :type="scope.row && scope.row.useOperator ? 'success' : 'danger'"
          >{{ scope.row.useOperator ? "开启" : "关闭" }}</el-tag
        >
      </template>
      <template #useCity="{ scope }">
        <el-tag :type="scope.row && scope.row.useCity ? 'success' : 'danger'">{{
          scope.row.useCity ? "开启" : "关闭"
        }}</el-tag>
      </template>
      <template #useRandomPar="{ scope }">
        <el-tag
          :type="scope.row && scope.row.useRandomPar ? 'success' : 'danger'"
          >{{ scope.row.useRandomPar ? "开启" : "关闭" }}</el-tag
        >
      </template>
      <template #operation="{ scope }">
        <el-button type="primary" text @click="onComEdit(scope.row)" :loading="editLoading"
          >编辑</el-button
        >
        <el-button type="primary" text @click="onComDel(scope.row)"
          >删除</el-button
        >
      </template>
    </Ttable>
    <ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
    <ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
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
