<script setup>
import { reactive, ref } from 'vue'
import { useAxios } from '@/hooks'
import { setMaintenanceClear } from '@/api/index'
import Tform from '@/components/Templates/Tform.vue'
import Ttable from '@/components/Templates/Ttable.vue'
import dayjs from 'dayjs'
import { notification, Modal } from 'ant-design-vue'

const ruleForm = reactive({
  date: ''
})

const { loading, data, onSuccess, onError, send } = useAxios(setMaintenanceClear, {
  defaultParams: ruleForm,
  immediate: false
})

onSuccess((res) => {
  notification.success({
    message: '提示',
    description: res.data || '清除成功!'
  })
})
onError((res) => {
  notification.error({
    message: '提示',
    description: res.message || '清除失败！'
  })
})

const submit = (type) => {
  Modal.confirm({
    title: '确认清除后不可恢复，是否继续？',
    onText: '确认',
    cancelText: '取消',
    onOk() {
      send()
      onSuccess((res) => {
        notification.success({
          message: '提示',
          description: '清除成功!'
        })
      })
      onError((res) => {
        notification.error({
          message: '提示',
          description: res.data?.message || '清除失败！'
        })
      })
    }
  })
}
const resetForm = () => {
  data.value = []
}

const ComEditRef = ref()
const onComEdit = (row) => {
  ComEditRef.value?.on_init(row)
}
</script>

<template>
  <div class="page-container">
    <div class="form-container">
      <Tform
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="[]"
        @submit="submit"
        @resetForm="resetForm"
        layout="inline"
        querytext="清除数据"
      >
        <a-form-item label="日期时间" name="date" :rules="{ required: true, message: '请选择日期时间' }">
          <a-date-picker
            v-model:value="ruleForm.date"
            format="YYYY-MM-DD HH:mm:ss"
            :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-item>
      </Tform>
    </div>
  </div>
</template>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
</style>