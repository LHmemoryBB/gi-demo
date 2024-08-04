<script setup>
	import { ref, reactive,defineAsyncComponent,defineEmits, defineExpose, } from 'vue'
	import { useAxios } from '@/hooks'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import { getCardType, setCardTypeDel } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { openDel } from '@/hooks/_del'
	
	const ComAdd = defineAsyncComponent(() => import('./card_type/add.vue'))
	const ComEdit = defineAsyncComponent(() => import('./card_type/edit.vue'))
	const ComCardPar = defineAsyncComponent(() => import('./card_type/cardPar.vue'))
	
	const emit = defineEmits();
	let Update = reactive({
		title: '卡种配置',
		width:'1000px',
		isShow: false,
		modal:false,
		draggable:false
	})

	const _state = ()=>({
		categoryCode: '',
		typeName: ''
	})
		
	const ruleForm = reactive(_state());

	
	const listInput = [{
			type: 'input',
			label: '卡种名称',
			prop: 'typeName',
			placeholder: '请输入卡种名称',
		}
	]
		
	const headers = [{
		label: '卡种名称',
		prop: 'typeName',
	}, {
		type: 'slot',
		label: '背景图片',
		template: {
			default: 'background'
		}
	}, {
		label: '标记',
		prop: 'flag'
	}, {
		label: '提示',
		prop: 'tip'
	}
	,{
		type: 'slot',
		label: '操作',
		template: {
			default: 'operation'
		}
	}
	]
	 
	const { loading, send, data, pages } = useAxios(getCardType, {
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
		ruleForm.categoryCode = row.categoryCode
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
		Object.assign(ruleForm, _state())
		data.value = []
	}
	
	const ComAddRef = ref();
	const onComAdd = (ruleform) => {
		ComAddRef.value?.on_init(ruleform)
	}
	
	const ComEditRef = ref();
	const onComEdit = (row) => {
		ComEditRef.value?.on_init(row)
	}
	const onComDel = (row) => {
		 openDel(setCardTypeDel,{id:row.id}).then(()=>{
		 	submit('form')
		 })
	}
	
	
	 const ComCardParRef = ref();
	 const onComCardPar = (row) => {
	 	ComCardParRef.value?.on_init(row)
	 }
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" @close="close" footer_hide>
		<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" @resetForm="resetForm" inline></Tform>
		<el-button type="primary" @click="onComAdd(ruleForm)">新增</el-button>
		<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
			<template #background="{scope}">
				<el-image style="width: 100px; height: 100px" :src="scope.row.background" fit />
			</template>
			<template #operation="{scope}">
				<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
				<el-button type="primary" text @click="onComCardPar(scope.row)">配置面值</el-button>
				<el-button type="primary" text @click="onComDel(scope.row)">删除</el-button>
			</template> 
		</Ttable>
		<ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
		<ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
		<ComCardPar ref="ComCardParRef" /> 
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
