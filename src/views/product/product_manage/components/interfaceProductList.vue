<script setup>
	import { reactive, ref, defineExpose, defineEmits } from 'vue';
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { openDel } from '@/hooks/_del'
	import { useAxios } from '@/hooks'
	import { setInterfaceInfoList } from '@/api/index'

	const emit = defineEmits();
	let Update = reactive({
		title: '接口列表',
		width:'880px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const _state = ()=>({
		platName: '',
		name: '',
		businessBackUrl: ''
	})
		
	const ruleForm = reactive(_state());
	
	const listInput = [{
			type: 'input',
			label: '平台名称',
			prop: 'platName',
			placeholder: '请输入平台名称',
		},{
			type: 'input',
			label: '接口名称',
			prop: 'name',
			placeholder: '请输入接口名称',
		},{
			type: 'input',
			label: '商户Id',
			prop: 'businessBackUrl',
			placeholder: '请输入商户Id',
		}
	]
	
	const headers = [{
		label: '平台名称',
		prop: 'platName'
	},{
		label: '商户ID',
		prop: 'businessBackUrl'
	},{
		label: '秘钥',
		prop: 'businessKey'
	},{
		label: '回调地址',
		prop: 'businessBackUrl'
	},{
		label: '接口地址',
		prop: 'interfaceUrl'
	}, {
		type: 'slot',
		label: '操作',
		width:	'180px',
		template: {
			default: 'operation'
		},
	}]
	
	//open初始
	const on_init = ()=> {
		Update.isShow = true
		Object.assign(ruleForm, _state())
	}
	
	const {
		loading,
		data,
		send,
		pages,
		onSuccess
	} = useAxios(setInterfaceInfoList, {
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
	
	const onChoice = (row) => {
		emit('interfaceId', 'interfaceProductList',row)
		Update.isShow = false
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" :loading="loading" footer_hide>
		<div class="content content_form">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		</div>
		<div class="content">
			<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
				<template #operation="{scope}">
					<el-button type="primary" text @click="onChoice(scope.row)">选择</el-button>
				</template>
			</Ttable>
		</div>
	</Tdialog>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>