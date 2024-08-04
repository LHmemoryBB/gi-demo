<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { useAxios } from '@/hooks'
	import { setInterfaceProductList } from '@/api/index'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '套餐配置',
		width:'900px',
		isShow: false,
		modal:false,
		draggable:false
	})
	
	const _state = ()=>({
			productName:'',
			productSn:'',
			interfaceId:''
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
		label: '允许地区',
		prop: 'whiteArea'
	}, {
		label: '限制地区',
		prop: 'blackArea'
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
	const on_init = (id)=> {
		Update.isShow = true
		Object.assign(ruleForm, _state())
		ruleForm.interfaceId = id
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
	
	const onChoice = (row) => {
		emit('interfaceId', 'interfaceProductDetails', row)
		Update.isShow = false
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" @close="close" footer_hide>
		<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		<Ttable :loading="loading" :headers="headers" :tableData="TableData" :pages="pages">
			<template #operation="{scope}">
				<el-button type="primary" text @click="onChoice(scope.row)">选择</el-button>
			</template>
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
