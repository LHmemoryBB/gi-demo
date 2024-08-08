<script setup>
import { ref, computed, toRaw, defineEmits, reactive, defineAsyncComponent } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import WangEdior from '@/components/WangEdior/index.vue'
import { getAboutMeDetail, setAboutMeUpdate } from '@/api/index'
import { notification } from 'ant-design-vue'
const _state = () => ({
  id: 1,
  aboutContent: ''
})
const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'custom',
    prop: 'aboutContent'
  }
]
const {
  loading: loadingDetail,
  onSuccess: onSuccessDetail,
  onError: onErrorDetail,
  send: sendDetail
} = useAxios(getAboutMeDetail, {
  immediate: false
})

//初始
const on_init = () => {
  sendDetail()
  onSuccessDetail((res) => {
    if (res.data) {
      ruleForm['aboutContent'] = res.data['aboutContent'] ?? ''
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

const { loading, data, onSuccess, onError, send } = useAxios(setAboutMeUpdate, {
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
        <template #aboutContent="scope">
          <div class="m_b_10">
            <wang-edior v-model="ruleForm.aboutContent"></wang-edior>
          </div>
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
.editor-content {
  height: 600px !important;
  overflow-y: hidden;
}
</style>
