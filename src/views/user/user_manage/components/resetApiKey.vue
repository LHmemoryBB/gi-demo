<script setup>
import { defineEmits, defineExpose } from 'vue'
import { useAxios } from '@/hooks'
import { setResetApiKey } from '@/api/index'
import { notification } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
const emit = defineEmits()

//open初始
const on_init = (row) => {
  const { data, onSuccess, onError, send } = useAxios(setResetApiKey, {
    immediate: false
  })
  Modal.confirm({
    title: '是否重置秘钥?',
    onText: '确认',
    cancelText: '取消',
    onOk() {
      send({ id: row.id })
      onSuccess((res) => {
        notification.success({
          message: '提示',
          description: '重置成功!'
        })
      })
      onError((res) => {
        notification.error({
          message: '提示',
          description: res.data?.message || '重置操作失败！'
        })
      })
    }
  })
}

defineExpose({
  on_init
})
</script>

<template></template>


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
