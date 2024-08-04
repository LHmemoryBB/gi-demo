<script setup>
	import { reactive, ref } from 'vue';
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { openDel } from '@/hooks/_del'
	import { useAxios } from '@/hooks'
	import { getActLogList } from '@/api/index'
	
	const ruleForm = reactive({
		startDate:'',
		endDate:'',
		interfaceUser: '',
		interfaceIp: '',
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
			type: 'input',
			label: '操作用户',
			prop: 'interfaceUser',
			placeholder: '请输入操作用户',
		},{
			type: 'input',
			label: 'ip地址',
			prop: 'interfaceIp',
			placeholder: '请输入ip地址',
		}
	]
	
	const headers = [{
		label: '操作人',
		prop: 'interfaceUser'
	},{
		label: '操作时间',
		prop: 'interfaceTime'
	},{
		label: '接口地址',
		prop: 'interfaceUrl'
	},{
		label: 'ip地址',
		prop: 'interfaceIp'
	},{
		label: '请求数据',
		prop: 'interfaceRequest'
	},{
		label: '响应数据',
		prop: 'interfaceReponse'
	}]
	const {
		loading,
		data,
		send,
		pages,
		onSuccess
	} = useAxios(getActLogList, {
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