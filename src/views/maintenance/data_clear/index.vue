<script setup>
	import { reactive, ref } from 'vue';
	import { useAxios } from '@/hooks'
	import { setMaintenanceClear } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';

	const ruleForm = reactive({
		date: ''
	})
	
	const { loading, data, onSuccess, onError, send } = useAxios(setMaintenanceClear,{
		defaultParams: ruleForm,
		immediate:false
	});
	
	onSuccess((res)=>{
		ElNotification.success({
			title: '提示',
			message: res.data || '清除成功!',
			duration: 3000
		})
	})
	onError((res)=>{
		ElNotification.error({
			title: '提示',
			message:  res.message || '清除失败！',
			duration: 3000
		})
	})

	const submit = (type) => {
		ElMessageBox.confirm(
				'确认清除后不可恢复，是否继续？', {
					title: '提示',
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true
							instance.confirmButtonText = 'Loading...'
							send()
							onSuccess((res)=>{
								setTimeout(() => {
									instance.confirmButtonLoading = false
								}, 300)
								ElNotification.success({
									title: '提示',
									message: '清除成功!',
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
									message: res.data.message || '清除失败！',
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
	const resetForm = () => {
		data.value = []
	}

	const ComEditRef = ref();
	const onComEdit = (row) => {
		ComEditRef.value?.on_init(row)
	}

</script>

<template>
	<div>
		<div class="content content_form">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="[]" @submit="submit" @resetForm="resetForm" inline querytext='清除数据'>
				<el-form-item label="日期时间" prop="date" :rules="{ required: true, message: '请选择日期时间' }">
					<el-date-picker v-model="ruleForm.date" value-format='YYYY-MM-DD HH:mm:ss' type="datetime" placeholder="选择日期时间"></el-date-picker>
				</el-form-item>
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