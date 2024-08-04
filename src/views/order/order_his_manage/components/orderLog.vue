<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { useAxios } from '@/hooks'
	import { getOrderLogHis } from '@/api/index'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '日志',
		width:'1000px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const _state = ()=>({
			id:''
	})
	
	const ruleForm = reactive(_state());
		
	const headers = [{
		label: '时间',
		prop: 'createDate',
		width: '200px'
	}, {
		label: '内容',
		prop: 'remark'
	}]
	 
	const { loading, send, data, pages } = useAxios(getOrderLogHis, {
		defaultParams: ruleForm,
		immediate: false,
		data_deconstruction: (res) => res.data.list,
		total_deconstruction: (res) => res.data.total,
		isPages: true
	});
	
	//open初始
	const on_init = (row)=> {
		Update.isShow = true
		Object.assign(ruleForm, _state())
		ruleForm.id = row.id
		send()
	}
	
	//关闭
	const close = ()=>{
		data.value = []
	}
	
	const submit = (type) => {
		if (type == 'form') pages.value.page = 1
		send()
	}
	
	const resetForm = () => {
		Object.assign(ruleForm, _state(), {userId:ruleForm.userId})
		data.value = []
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" @close="close" footer_hide>
		<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
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
