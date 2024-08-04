<script setup>
	import { reactive, ref } from 'vue';
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { useAxios } from '@/hooks'
	import { getInterfaceAnalysis } from '@/api/index'
	
	const ruleForm = reactive({
		startDate:'',
		endDate:'',
		interfaceId: ''
	})
	
	const listInput = [{
			type:'time',
			_type:'datetimerange',
			label:'日期选择',
			prop: ['##datetimerange'],
			_prop: ['startDate','endDate'],
			// disabledDate:'2020-04-1',
			format:'YYYY-MM-DD HH:mm:ss',
			placeholder:['开始日期','结束日期'],
		},{
			type: 'select',
			label: '接口名称',
			prop: 'interfaceId',
			_url: '/interfaceAnalysis/interfaceId',
			filterable: true,
			default_not_request: true
		}
	]
	
	const headers = [{
		label: '统计时间',
		prop: 'statisticDate'
	},{
		label: '接口名称',
		prop: 'interfaceName'
	},{
		label: '成功单数',
		prop: 'succCount'
	},{
		label: '失败单数',
		prop: 'failCount'
	},{
		label: '成功金额',
		prop: 'succAmount'
	},{
		label: '成本',
		prop: 'cost'
	},{
		label: '利润',
		prop: 'profit'
	},{
		label: '成功率',
		prop: 'succRateStr'
	}]
	const {
		loading,
		data,
		send,
		pages,
		onSuccess
	} = useAxios(getInterfaceAnalysis, {
		defaultParams: ruleForm,
		immediate: true,
		data_deconstruction: (res) => res.data.list,
		total_deconstruction: (res) => res.data.total,
		isPages: true
	});
	
	const sumPoint = ref(0)
	onSuccess((res) => {
		sumPoint.value = res.data.sumPoint
	})
	
	const submit = (type) => {
		if (type == 'form') pages.value.page = 1
		send()
	}
	const resetForm = () => {
		data.value = []
	}
	
</script>

<template>
	<div>
		<div class="content content_form">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		</div>
		<div class="content">
			<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages"></Ttable>
		</div>
	</div>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>
