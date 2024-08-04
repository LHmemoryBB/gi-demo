<script setup>
import { ref, reactive, toRaw, defineAsyncComponent } from "vue";
import Tform from "@/components/GiForm/index.vue";
import { useAxios } from '@/hooks'
import {
  getInviteDetail,
  setInviteUpdate,
} from "@/api/index";

const _state = () => ({
  id: 1,
  enabled: false,
  limitNum: "",
  limitAmount: ""
});
const ruleForm = reactive(_state());
const listInput = [
  {
    type: "input",
    label: "推广人数",
    prop: "limitNum",
    rules: { required: true, message: "请输入限制开放推广人数" },
  },
  {
    type: "input",
    label: "做单金额",
    prop: "limitAmount",
    rules: { required: true, message: "请输入限制开放做单金额" },
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
} = useAxios(getInviteDetail, {
  immediate: false,
});

//初始
const on_init = () => {
  sendDetail();
  onSuccessDetail((res) => {
    if(res.data){
    	for(let keys in ruleForm){
    		ruleForm[keys] = res.data[keys] ?? ''
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
}

const { loading, data, onSuccess, onError, send } = useAxios(setInviteUpdate, {
  immediate: false,
});
onSuccess((res) => {
  ElNotification.success({
    title: "提示",
    message: res.message || "修改成功!",
    duration: 3000,
  })
})
onError((res) => {
  ElNotification.error({
    title: "提示",
    message: res.message || "修改失败！",
    duration: 3000,
  })
})

//提交
const submit = (type) => {
  let data = {
    ...ruleForm
  }
  send(data);
}

//确认
const confirm = () => {
  RefTform.value?.submitForm();
}
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
        	<el-form-item label="活动开关" prop="enabled" label-width="120px">
        		<el-switch
        		    v-model="ruleForm.enabled"
        			active-text="是"
        			inactive-text="否"
        			inline-prompt
        		  />
        	</el-form-item>
        </template>
      </Tform>
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
