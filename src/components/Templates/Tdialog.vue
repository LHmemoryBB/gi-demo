<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { Modal } from 'ant-design-vue'
const emit = defineEmits()
const props = defineProps({
  Update: {
    type: Object,
    default: () => {}
  },
  footer_hide: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: 'dialog'
  }
})

const close = () => {
  emit('close')
}
</script>

<template>
	<Modal
		:class="className || 'modal'"
		v-model:open="Update.isShow" 
		:width="Update.width" 
		:maskClosable="!Update.modal" 
		lock-scroll
		append-to-body
		destroy-on-close
		@ok="emit('confirm')"
		@cancel="close">
		<template #title=>
			<div class="my-header">
		        <div>{{Update.title}}</div>
			</div>
		</template>
		<slot></slot>
		<template #footer v-if="!footer_hide">
			<div class="dialog-footer">
		        <a-button @click="Update.isShow = false,close()" >取消</a-button>
		        <a-button :loading="loading" type="primary" @click="emit('confirm')">提交</a-button>
			</div>
		</template>
	</Modal>
</template>

<style scoped>
.my-header {
  font-size: 16px;
}
</style>
<style>
</style>