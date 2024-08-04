<script setup>
	import { reactive, ref } from 'vue';
	import { useAxios } from '@/hooks'
	import { getDictionaryList, setDictionaryDel } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { defineAsyncComponent } from 'vue';
	import { openDel } from '@/hooks/_del'

	const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
	const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
	
	const ruleForm = reactive({
		parentCode:'',
		itemCode: '',
		itemName: '',
		itemValue: ''
	})
	
	const listInput = [{
			type: 'select',
			label: '所属父项',
			prop: 'parentCode',
			_value:'value',
			_label:'text',
			filterable: true,
			_url: '/dictionary/all',
			default_not_request: true
		},{
			type: 'input',
			label: '字典编码',
			prop: 'itemCode',
			placeholder: '请输入字典项名称',
		},{
			type: 'input',
			label: '字典名称',
			prop: 'itemName',
			placeholder: '请输入字典项名称',
		},{
			type: 'input',
			label: '字典值',
			prop: 'itemValue',
			placeholder: '请输入字典项值',
		}
	
	]
	
	const headers = [{
		label: '字典父项',
		prop: 'parentName'
	}, {
		label: '字典名称',
		prop: 'itemName'
	}, {
		label: '字典编码',
		prop: 'itemCode'
	}, {
		label: '字典值',
		prop: 'itemValue'
	}, {
		label: '等级',
		prop: 'grade'
	}, {
		type: 'slot',
		label: '操作',
		width:	'120px',
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
	} = useAxios(getDictionaryList, {
		defaultParams: ruleForm,
		immediate: true,
		data_deconstruction: (res) => res.data.list,
		total_deconstruction: (res) => res.data.total,
		isPages: true
	});


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
	
	const ComAddRef = ref();
	const onComAdd = () => {
		ComAddRef.value?.on_init()
	}
	
	const onComDel = (row) => {
		openDel(setDictionaryDel,{id:row.id}).then(()=>{
			submit('form')
		})
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
				<template #operation="{scope}">
					<div class="_btn"></div>
					<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
					<el-button type="primary" text @click="onComDel(scope.row)">删除</el-button>
				</template>
			</Ttable>
		</div>
		<ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
		<ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
	</div>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>