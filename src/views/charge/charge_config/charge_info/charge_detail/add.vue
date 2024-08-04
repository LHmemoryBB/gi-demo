<script setup>
import { ref, reactive, defineEmits, defineExpose } from "vue";
import Tdialog from "@/components/Templates/Tdialog.vue";
import Tform from "@/components/GiForm/index.vue";
import { useAxios } from '@/hooks'
import {
  up_singlePdf,
  up_image,
  setChargeDetailAdd,
  getPrice,
} from "@/api/index";
import TuploadPdf from "@/components/GiUpload/fileUpload.vue";
import TuploadImg from "@/components/GiUpload/ImageUploader.vue";
import Tselect from "@/components/Templates/Tselect.vue";
import Ttable from "@/components/Templates/Ttable.vue";

const emit = defineEmits();
let Update = reactive({
  title: "新增",
  width: "1080px",
  isShow: false,
  modal: true,
  draggable: true,
});

const _state = () => ({
  chargeId: "",
  channelName: "",
  channelImg: [],
  useCity: false,
  useRandomPar: false,
  chargeConfigs: [],
  description: "",
  tips: "",
  agreement: []
});

let ruleForm = reactive(_state());
const listInput = [
  {
    type: "input",
    label: "渠道名称",
    prop: "channelName",
    rules: { required: true, message: "请输入渠道名称" },
  },
  // {
  //   type: "input",
  //   label: "渠道标识",
  //   prop: "channelValue",
  //   rules: { required: true, message: "请输入渠道标识" },
  // },
  {
    type: "input",
    label: "平台账号",
    prop: "userId",
    rules: { required: true, message: "请输入平台账号" },
  },
  {
    type: "input",
    label: "平台秘钥",
    prop: "userKey",
    rules: { required: true, message: "请输入平台秘钥" },
  },
  {
    type: "custom",
    label: "背景图标",
    prop: "channelImg",
  },
  {
    type: "custom",
    prop: "useCity",
  },
  {
    type: "custom",
    prop: "useCk",
  },
  {
    type: "custom",
    prop: "useRandomPar",
  },
  {
    type: "custom",
    prop: "chargeConfigId",
  },
  {
    type: "custom",
    prop: "agreement",
  },
  {
    type: "custom",
    prop: "description",
  },
  {
    type: "custom",
    prop: "tips",
  }
];
let publicParam = {};
const headers = [
  {
    type: "slot",
    label: "取单平台",
    template: {
      default: "selectPlatForm",
    },
  },
  {
    type: "slot",
    label: "运营商",
    template: {
      default: "selectOperator",
    },
  },
  {
    type: "slot",
    label: "面值",
    template: {
      default: "selectPar",
    },
  },
  {
    label: "结算价",
    prop: "platPrice",
  },
  {
    type: "slot",
    label: "邀请分润",
    template: {
      default: "inviteProfit",
    },
  },
  {
    type: "slot",
    label: "接单价",
    template: {
      default: "chargePrice",
    },
  },
];
const tableDataAdd = () => {
  ruleForm.chargeConfigs.push({
    platForm: "",
    operator: "",
    inviteProfit: null,
    selectPar: "",
    platPrice: "",
    chargePrice: null,
    chargeId: ""
  });
};
const selectionList = ref([]);
const TableRef = ref(null)
const tableDataDel = () => {
  const list = TableRef.value.getSelectionRows()
  if (list.length === 0) {
    ElMessage.warning("请先选择要删除的数据");
    return false;
  }
  ruleForm.chargeConfigs = ruleForm.chargeConfigs.filter(row => !list.includes(row));
};
const onSelectAll = (data) => {
  selectionList.value = data;
};
//open初始
const on_init = (ruleform, type) => {
  ruleForm.chargeId = ruleform.id
  ruleForm.chargeConfigs = []
  Update.isShow = true;
};
//关闭
const RefTform = ref(null);
const close = () => {
  RefTform.value?.resetForm();
};

const { loading, data, onSuccess, onError, send } = useAxios(
  setChargeDetailAdd,
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
  let data = {
    ...ruleForm,
    channelImg: ruleForm.channelImg.map((item) => item.response[0])[0],
	agreement: ruleForm.agreement[0].response.data ?? ruleForm.agreement[0].response[0],
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
const pathRemove = (file, fileList, keys) => {
  ruleForm[keys] = fileList;
};



// 下拉框选项变化事件
const selectChange = (row, num) => {
  (row.platPrice = ""), (row.par = "");
  if (num) {
    row.operator = "";
  }
};
// 面值下拉框选项变化事件
const {
  onSuccess: priceSuccess,
  onError: priceError,
  send: priceSend,
} = useAxios(getPrice, {
  immediate: false,
});
priceSuccess((res) => {
  ruleForm.chargeConfigs[tableIndex.value].platPrice = res.data.price;
  ruleForm.chargeConfigs[tableIndex.value].chargeId = res.data.chargeId;
});
priceError((res) => {
  // ElMessageBox.alert(`${res.data.message},请重新选择报价`, '提示', {
  //   confirmButtonText: '确认',
  // })
  ruleForm.chargeConfigs[tableIndex.value].platPrice = ''
  ruleForm.chargeConfigs[tableIndex.value].chargeId = ''
});
const tableIndex = ref(null);
const parSelectChange = (row, index) => {
  if (row.par) {
    tableIndex.value = index;
    priceSend({
      userId: ruleForm.userId,
      userKey: ruleForm.userKey,
      operator: row.operator,
      platForm: row.platForm,
      par: row.par,
    });
  }
};
// 接单价最大值
const getMaxchargePrice = (row) =>{
  if (!row.platPrice) {
    return 0
  }
  if (!row.inviteProfit) {
    return 0
  }
  return Number(row.platPrice) - Number(row.inviteProfit)
}
// 分润最大值
const getMaxInviteProfit = (row) =>{
  if (!row.platPrice) {
    return 0
  }
  if (!row.chargePrice) {
    return Number(row.platPrice) || 0
  }
  return Number(row.platPrice) - Number(row.chargePrice)
}
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
    :className="'rule-dialog'"
    width="80%"
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
      <template #channelImg="scope">
        <el-form-item
          label="背景图标"
          :prop="'channelImg'"
          :rules="{ required: true, message: '请添加图片' }"
          label-width="120px"
        >
          <TuploadImg
            :up_img_api="up_image"
            :fileList="ruleForm.channelImg"
            :size="1024 * 1024 * 5"
            sizeName="5MB"
            :limit="1"
            @pathSuccess="
              (response, file, fileList) =>
                pathSuccess(response, file, fileList, 'channelImg')
            "
            @pathRemove="(file, fileList) => pathRemove(file, fileList, 'channelImg')"
          ></TuploadImg>
          <!-- {{ruleForm.channelImg}}
          <TuploadImg
            :up_img_api="up_image"
            :fileList="ruleForm.channelImg"
            :size="1024 * 1024"
            sizeName="1MB"
            :limit="1"
            multiple
          ></TuploadImg> -->
        </el-form-item>
      </template>
      <template #useCity="scope">
        <el-form-item label="启用省份" prop="useCity" label-width="120px">
          <el-switch
            v-model="ruleForm.useCity"
            active-text="是"
            inactive-text="否"
            inline-prompt
          />
        </el-form-item>
      </template>
	  <template #useCk="scope">
	    <el-form-item label="是否开启CK" prop="useCk" label-width="120px">
	      <el-switch
	        v-model="ruleForm.useCk"
	        active-text="是"
	        inactive-text="否"
	        inline-prompt
	      />
	    </el-form-item>
	  </template>
      <template #useRandomPar="scope">
        <el-form-item label="随机面值" prop="useRandomPar" label-width="120px">
          <el-switch
            v-model="ruleForm.useRandomPar"
            active-text="是"
            inactive-text="否"
            inline-prompt
          />
        </el-form-item>
      </template>
	  <template #agreement="scope">
	    <el-form-item
	      label="协议文档"
	      :prop="'agreement'"
	      :rules="{ required: true, message: '请上传pdf文件' }"
	      label-width="120px"
	    >
	      <TuploadPdf
	        :action="up_singlePdf"
	        :fileList="ruleForm.agreement"
	        @pathSuccess="
	          (response, file, fileList) =>
	            pathSuccess(response, file, fileList, 'agreement')
	        "
	        @pathRemove="
	          (file, fileList) => pathRemove(file, fileList, 'agreement')
	        "
	      ></TuploadPdf>
	    </el-form-item>
	  </template>
	  <template #description="scope">
	    <div class="label-div">说明描述</div>
	    <div class="editor-div">
	      <wang-edior v-model="ruleForm.description"></wang-edior>
	    </div>
	  </template>
	  <template #tips="scope">
	    <div class="label-div">注意事项</div>
	    <div class="editor-div">
	      <wang-edior v-model="ruleForm.tips"></wang-edior>
	    </div>
	  </template>
      <el-card shadow="never">
        <el-button type="primary" @click="tableDataAdd">新增一行</el-button>
        <el-button type="danger" @click="tableDataDel">删除选中</el-button>
        <span style="margin-left:20px; color:red">
          <el-alert title="温馨提示：分润 + 接单价 ≤ 结算价" type="error" :closable="false" style="display: inline;font-weight:600"/>
        </span>
        
        <Ttable
          :loading="loading"
          :headers="headers"
          :tableData="ruleForm.chargeConfigs"
          selection_all_show
          ref="TableRef"
          pagesHide
        >
          <template #selectPlatForm="{ scope }">
            <Tselect
              :ruleForm="scope.row"
              :listInput="{
                prop: 'platForm',
                _url: '/chargeDetail/selectPlatForm',
                _value: 'id',
                _label: 'value',
                placeholder: '请选择取单平台',
                default_not_request: true,
                every_time_request: false,
              }"
              :params="{
                userId: ruleForm.userId,
                userKey: ruleForm.userKey,
              }"
              :disabled="!ruleForm.userId || !ruleForm.userKey"
              @selectChange="selectChange(scope.row, true)"
            />
          </template>
          <template #selectOperator="{ scope }">
            <Tselect
              :ruleForm="scope.row"
              :listInput="{
                prop: 'operator',
                _url: '/chargeDetail/selectOperator',
                _value: 'id',
                _label: 'value',
                placeholder: '请选择运营商',
                default_not_request: true,
                every_time_request: false,
              }"
              :params="{
                userId: ruleForm.userId,
                userKey: ruleForm.userKey,
              }"
              @selectChange="selectChange(scope.row)"
              :disabled="!ruleForm.userId || !ruleForm.userKey"
            />
          </template>
          <template #selectPar="{ scope }">
            <Tselect
              :ruleForm="scope.row"
              :listInput="{
                prop: 'par',
                _url: '/chargeDetail/selectPar',
                _value: 'name',
                _label: 'value',
                placeholder: '请选择面值',
                default_not_request: true,
                every_time_request: false,
              }"
              :params="{
                userId: ruleForm.userId,
                userKey: ruleForm.userKey,
                platForm: scope.row.platForm,
                operator: scope.row.operator,
              }"
              :disabled="
                (!scope.row.platForm && scope.row.platForm !== 0) ||
                (!scope.row.operator && scope.row.operator !== 0)
              "
              @selectChange="parSelectChange(scope.row, scope.$index)"
            />
          </template>
          <template #inviteProfit="{ scope }">
            <el-input-number
              v-model="scope.row.inviteProfit"
              placeholder="分润 + 接单价 ≤ 结算价"
              :min="0" :max="getMaxInviteProfit(scope.row)"
              :precision="2"
              :disabled="!scope.row.platPrice"
            ></el-input-number>
          </template>
          <template #chargePrice="{ scope }">
            <el-input-number
              :min="0"
              :max="getMaxchargePrice(scope.row)"
              :precision="2"
              v-model="scope.row.chargePrice"
              placeholder="请填写接单价"
              :disabled="!scope.row.platPrice"
            ></el-input-number>
          </template>
        </Ttable>
      </el-card>
    </Tform>
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
