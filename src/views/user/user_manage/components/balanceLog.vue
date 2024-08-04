<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import useAxios from '@/hooks/useAxios'
	import { setUserBalanceLog } from '@/api/index'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '余额日志',
		width:'900px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const _state = ()=>({
			userId:'',
			startDate:'',
			endDate:'',
			type:''
	})
		
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'time',
			_type:'datetimerange',
			label:'日期选择',
			prop: ['##datetimerange'],
			_prop: ['startDate','endDate'],
			// disabledDate:'2020-04-1',
			format:'YYYY-MM-DD HH:mm:ss',
			placeholder:['开始日期','结束日期'],
		},
		{
			type: 'select',
			label: '交易方式',
			prop: 'type',
			_url: '/userBalanceLog/useType',
			default_not_request: true
		}
	]
	
	const headers = [{
		label: '时间',
		prop: 'createDate',
		width: '170px'
	}, {
		label: '交易前余额',
		prop: 'balance',
		width: '110px'
	}, {
		label: '交易金额',
		prop: 'balanceChange',
		width: '90px'
	}, {
		label: '交易类型',
		prop: 'typeStr',
		width: '90px'
	}, {
		label: '说明',
		prop: 'remark'
	}]
	
	const { loading, onSuccess:getSuccess, onError:getError, send:getSend, data:TableData, pages } = useAxios(setUserBalanceLog, {
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
		ruleForm.userId = row.id
		getSend()
	}
	
	//关闭
	const close = ()=>{
		TableData.value = []
	}
	
	const submit = (type) => {
		if (type == 'form') pages.value.page = 1
		getSend()
	}
	
	const resetForm = () => {
		Object.assign(ruleForm, _state(), {userId:ruleForm.userId})
		TableData.value = []
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" @close="close" footer_hide>
		<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		<Ttable :loading="loading" :headers="headers" :tableData="TableData" :pages="pages">
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
