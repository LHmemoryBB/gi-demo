<script setup>
import { ref, reactive, toRaw, defineAsyncComponent } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { getInviteDetail, setInviteUpdate } from '@/api/index'
import { notification } from 'ant-design-vue'
const _state = () => ({
  id: 1,
  enabled: false,
  limitNum: '',
  limitAmount: ''
})
const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'input',
    label: '推广人数',
    prop: 'limitNum',
    rules: { required: true, message: '请输入限制开放推广人数' }
  },
  {
    type: 'input',
    label: '做单金额',
    prop: 'limitAmount',
    rules: { required: true, message: '请输入限制开放做单金额' }
  },
  {
    type: 'custom',
    prop: 'enabled'
  }
]
const {
  loading: loadingDetail,
  onSuccess: onSuccessDetail,
  onError: onErrorDetail,
  send: sendDetail
} = useAxios(getInviteDetail, {
  immediate: false
})

//初始
const on_init = () => {
  sendDetail()
  onSuccessDetail((res) => {
    if (res.data.id == 1) {
      for (let keys in ruleForm) {
        ruleForm[keys] = res.data[keys] ?? ''
      }
    }
  })
  onErrorDetail((res) => {
    notification.error({
      message: '提示',
      description: res.message || '数据异常！',
    })
  })
}
on_init()

//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setInviteUpdate, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.message || '修改成功!',
  })
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '修改失败！',
  })
})

//提交
const submit = (type) => {
  let data = {
    ...ruleForm
  }
  send(data)
}

//确认
const confirm = () => {
  RefTform.value?.submitForm()
}
</script>

<template>
  <div class="page-container">
    <div class="form-container">
      <Tform
        ref="RefTform"
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        label_width="120px"
        querytext="修改"
      >
        <template #enabled>
          <a-form-item label="活动开关" name="enabled" label-width="120px">
            <a-switch v-model:checked="ruleForm.enabled" checked-children="是" un-checked-children="否"/>
          </a-form-item>
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
