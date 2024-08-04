<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import useAxios from '@/hooks/useAxios'
	import { setUserTransaction } from '@/api/index'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '用户账单',
		width:'1000px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const _state = ()=>({
			userId:'',
			startDate:'',
			endDate:''
	})
		
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'time',
			_type:'daterange',
			label:'日期选择',
			prop: ['##daterange'],
			_prop: ['startDate','endDate'],
			// disabledDate:'2020-04-1',
			format:'YYYY-MM-DD HH:mm:ss',
			placeholder:['开始日期','结束日期'],
		}
	]
	
	const headers = [{
		label: '时间',
		prop: 'statisticDate',
		width: '200px'
	}, {
		label: '订单数',
		prop: 'orderNum'
	}, {
		label: '订单金额',
		prop: 'orderAmount'
	}, {
		label: '成功数',
		prop: 'successNum'
	}, {
		label: '成功金额',
		prop: 'successAmount'
	}, {
		label: '期初金额',
		prop: 'startAmount'
	}, {
		label: '期末金额',
		prop: 'endAmount'
	}, {
		label: '加款金额',
		prop: 'addAmount'
	}, {
		label: '扣款金额',
		prop: 'chargeAmount'
	}]
	
	const { loading, onSuccess:getSuccess, onError:getError, send:getSend, data:TableData, pages } = useAxios(setUserTransaction, {
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
