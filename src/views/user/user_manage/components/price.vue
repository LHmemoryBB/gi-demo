<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import useAxios from '@/hooks/useAxios'
	import { getUserPrice, setUserPrice } from '@/api/index'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '价格自定义',
		width:'800px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const headers = [{
		label: '产品名称',
		prop: 'productName'
	}, {
		label: '产品原价格',
		prop: 'price'
	}, {
		type: 'edit',
		label: '自定义价格',
		prop: 'userPrice'
	}]
	
	const form = ref({})
	
	const { loading:getLoading, onSuccess:getSuccess, onError:getError, send:getSend, data:TableData } = useAxios(getUserPrice, {
		immediate: false,
		data_deconstruction: (res) => res.data,
	});
	
	const getTable = ()=>{
		getSend({userId:form.value['UserId']})
	}
	
	//open初始
	const on_init = (row)=> {
		Update.isShow = true
		form.value = {}
		form.value['UserId'] = row.id
		getTable()
	}
	
	const close = ()=>{
		
	}
	
	const change_edit = (row)=>{
		form.value['productId'] = row.id
		form.value['price'] = row.userPrice
		ElMessageBox.confirm(
			'确定要提交此次修改吗？', {
				title: '提示',
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				beforeClose: (action, instance, done) => {
					getTable()
					if (action === 'confirm') {
						instance.confirmButtonLoading = true
						instance.confirmButtonText = 'Loading...'
						send(form.value)
						
					}
					done()
				}
			}
		)
	}
	
	const { loading, data, onSuccess, onError, send } = useAxios(setUserPrice,{
		immediate:false
	});
	onSuccess((res)=>{
		getTable()
		ElNotification.success({
			title: '提示',
			message: res.message || '新增成功!',
			duration: 3000
		})
		emit('onSuccess')
	})
	onError((res)=>{
		getTable()
		ElNotification.error({
			title: '提示',
			message:  res.message || '新增失败！',
			duration: 3000
		})
	})
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" :loading="loading" @close="close" footer_hide>
		<Ttable :loading="getLoading" :headers="headers" :tableData="TableData" @change_edit="change_edit" pagesHide>
		</Ttable>
	</Tdialog>
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
