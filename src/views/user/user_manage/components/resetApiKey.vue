<script setup>
	import { defineEmits, defineExpose } from 'vue'
	import useAxios from '@/hooks/useAxios'
	import { setResetApiKey } from '@/api/index'
	
	const emit = defineEmits();
	
	//open初始
	const on_init = (row)=> {
		const { data, onSuccess, onError, send } = useAxios(setResetApiKey,{
			immediate:false
		});
		ElMessageBox.confirm(
				'是否重置秘钥？', {
					title: '提示',
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true
							instance.confirmButtonText = 'Loading...'
							send({id:row.id})
							onSuccess((res)=>{
								setTimeout(() => {
									instance.confirmButtonLoading = false
								}, 300)
								ElNotification.success({
									title: '提示',
									message: '重置成功!',
									duration: 3000
								})
								done()
							})
							onError((res)=>{
								setTimeout(() => {
									instance.confirmButtonLoading = false
									instance.confirmButtonText = '重试'
								}, 300)
								ElNotification.error({
									title: '提示',
									message: res.data?.message || '重置操作失败！',
									duration: 3000
								})
							})
						} else {
							done()
						}
					}
				}
			)
			.catch(() => {
		
			})
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	
</template>


<style scoped>
	.fixed_width_box{
		display: flex;
		border-bottom: 1px solid #eee;
		padding-top: 10px;
	}
	.fixed_width{
		display: flex;
		flex-direction: column;
	}
</style>
