<script setup>
	import { ref, reactive, defineEmits, defineExpose, defineAsyncComponent } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { switch_beforeChange } from '@/hooks/Tswitch';
	import { useAxios } from '@/hooks'
	import { openDel } from '@/hooks/_del'
	import { setInterfaceProductList, setInterfaceProductDel,setInterfaceProductEnabled } from '@/api/index'
	
	const ComEdit = defineAsyncComponent(() => import('./interfaceProductEdit.vue'))
	const ComAdd = defineAsyncComponent(() => import('./interfaceProductAdd.vue'))
	
	const emit = defineEmits();
	let Update = reactive({
		title: '套餐配置',
		width:'1200px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const _state = ()=>({
			productName:'',
			productSn:'',
			interfaceId:'',
			enabled: ''
	})
	
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type: 'input',
			label: '套餐名称',
			prop: 'productName',
			placeholder: '请输入套餐名称',
		},{
			type: 'input',
			label: '产品编码',
			prop: 'productSn',
			placeholder: '请输入产品编码',
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
		label: '名称',
		prop: 'productName'
	}, {
		label: '成本',
		prop: 'cost'
	}, {
		label: '产品ID',
		prop: 'productId'
	}, {
		label: '产品编码',
		prop: 'productSn'
	}, {
		label: '面值',
		prop: 'par'
	}, {
		label: '价格',
		prop: 'price'
	}, {
		label: '利润',
		prop: 'profit'
	}, {
		label: '允许地区',
		prop: 'whiteArea'
	}, {
		label: '限制地区',
		prop: 'blackArea'
	}, {
		type: 'slot',
		label: '启停',
		template: {
			default: 'enabled'
		},
	}, {
		type: 'slot',
		label: '操作',
		width:	'120px',
		template: {
			default: 'operation'
		},
	}]
	
	const { loading, onSuccess:getSuccess, onError:getError, send:getSend, data:TableData, pages } = useAxios(setInterfaceProductList, {
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
		ruleForm.interfaceId = row.id
		getSend()
	}
	
	//关闭
	const close = ()=>{
		Object.assign(ruleForm, _state())
	}
	
	const submit = (type) => {
		if (type == 'form') pages.value.page = 1
		getSend(ruleForm)
	}
	
	const resetForm = () => {
		TableData.value = []
	}
	
	const ComEditRef = ref();
	const onComEdit = (row) => {
		ComEditRef.value?.on_init({...row,interfaceId:ruleForm.interfaceId})
	}
	
	const ComAddRef = ref();
	const onComAdd = () => {
		ComAddRef.value?.on_init(ruleForm)
	}
	
	const onComDel = (row) => {
		openDel(setInterfaceProductDel,{id:row.id}).then(()=>{
			submit('form')
		})
	}
	
	const switch_enabled_beforeChange = (row) => {
		const data = {
			'id': row.id,
			'enabled': !row.enabled
		}
		return switch_beforeChange(setInterfaceProductEnabled,data,row,'enabled_loading')
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" @close="close" footer_hide>
		<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		<el-button type="primary" @click="onComAdd()">新增</el-button>
		<Ttable :loading="loading" :headers="headers" :tableData="TableData" :pages="pages">
			<template #enabled="{scope}">
				<el-switch v-model="scope.row.enabled" active-text="是" inactive-text="否" inline-prompt
					:loading="scope.row.enabled_loading"
					:before-change="switch_enabled_beforeChange.bind(this,scope.row)" />
			</template>
			<template #operation="{scope}">
				<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
				<el-button type="primary" text @click="onComDel(scope.row)">删除</el-button>
			</template>
		</Ttable>
		<ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
		<ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
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
