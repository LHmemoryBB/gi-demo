<script setup>
	import { reactive, ref, defineAsyncComponent } from 'vue';
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { switch_beforeChange } from '@/hooks/Tswitch';
	import { openDel } from '@/hooks/_del'
	import { useAxios } from '@/hooks'
	import { setInterfaceInfoList, setInterfaceInfoDel, setInterfaceEnabled } from '@/api/index'

	const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
	const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
	const ComInterfaceProduct = defineAsyncComponent(() => import('./components/interfaceProduct.vue'))
	
	const ruleForm = reactive({
		platName: '',
		name: '',
		businessId: '',
		enabled: ''
	})
	
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
			prop: 'businessId',
			placeholder: '请输入商户Id',
		},
		{
			type: 'select',
			label: '是否启用',
			prop: 'enabled',
			options: [{
					value: '是',
					id: 1
				},
				{
					value: '否',
					id: 0
				}
			],
			placeholder: '请选择是否启用',
			default_not_request: true
		}
		
	]
	
	const headers = [{
		label: '平台名称',
		prop: 'platName'
	},{
		label: '商户ID',
		prop: 'businessId'
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
		label: '查单地址',
		prop: 'interfaceQueryUrl'
	}, 
	{
		type: 'slot',
		label: '启停',
		template: {
			default: 'enabled'
		},
	}, {
		type: 'slot',
		label: '操作',
		width:	'180px',
		template: {
			default: 'operation'
		},
	}]
	
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

	const ComEditRef = ref();
	const onComEdit = (row) => {
		ComEditRef.value?.on_init(row)
	}
	
	const ComInterfaceProductRef = ref();
	const onComInterfaceProductEdit = (row) => {
		ComInterfaceProductRef.value?.on_init(row)
	}
	
	const ComAddRef = ref();
	const onComAdd = () => {
		ComAddRef.value?.on_init()
	}
	
	const onComDel = (row) => {
		openDel(setInterfaceInfoDel,{id:row.id}).then(()=>{
			submit('form')
		})
	}
	
	const switch_enabled_beforeChange = (row) => {
		const data = {
			'id': row.id,
			'enabled': !row.enabled
		}
		return switch_beforeChange(setInterfaceEnabled,data,row,'enabled_loading')
	}

</script>

<template>
	<div>
		<div class="content content_form">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		</div>
		<div class="content">
			<el-button type="primary" @click="onComAdd()">新增</el-button>
			<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
				<template #enabled="{scope}">
					<el-switch v-model="scope.row.enabled" active-text="是" inactive-text="否" inline-prompt
						:loading="scope.row.enabled_loading"
						:before-change="switch_enabled_beforeChange.bind(this,scope.row)" />
				</template>
				<template #operation="{scope}">
					<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
					<el-button type="primary" text @click="onComInterfaceProductEdit(scope.row)">套餐配置</el-button>
					<el-button type="primary" text @click="onComDel(scope.row)">删除</el-button>
				</template>
			</Ttable>
		</div>
		<ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
		<ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
		<ComInterfaceProduct ref="ComInterfaceProductRef" @onSuccess="submit('form')" />
	</div>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>