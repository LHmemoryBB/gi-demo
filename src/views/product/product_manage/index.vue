<script setup>
	import { reactive, ref, defineAsyncComponent } from 'vue';
	import { useAxios } from '@/hooks'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { switch_beforeChange } from '@/hooks/Tswitch';
	import { openDel } from '@/hooks/_del'
	import { getProductList, setProductDel, setProductEnabled, setProductMarketd } from '@/api/index'

	const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
	const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))

	const ruleForm = reactive({
		categoryId: '',
		productName: '',
		operator: '',
		marketd: '',
		enabled: '',
	})
	const listInput = [
		{
			type: 'select',
			label: '所属分类',
			prop: 'categoryId',
			_url: '/productCategory/category',
			default_not_request: true
		},
		{
			type: 'input',
			label: '产品名称',
			prop: 'productName',
			placeholder: '请输入产品名称',
		},
		{
			type: 'select',
			label: '运营商',
			prop: 'operator',
			_url: '/product/operator',
			default_not_request: true
		},
		{
			type: 'select',
			label: '是否上架',
			prop: 'marketd',
			options: [{
					value: '是',
					id: 1
				},
				{
					value: '否',
					id: 0
				}
			],
			placeholder: '请选择是否上架',
			default_not_request: true
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
		label: 'ID',
		prop: 'id',
		width: '50px'
	}, {
		label: '分类',
		prop: 'categoryName',
		width: '80px'
	}, {
		label: '名称',
		prop: 'productName',
		width: '120px'
	}, {
		label: '运营商',
		prop: 'operatorStr',
		width: '80px'
	}, {
		label: '允许地区',
		prop: 'whiteArea',
		width: '100px'
	}, {
		label: '限制地区',
		prop: 'blackArea',
		width: '100px'
	}, {
		label: '面值',
		prop: 'par',
		width: '80px'
	}, {
		label: '价格',
		prop: 'price',
		width: '80px'
	}, {
		type: 'slot',
		label: '接口套餐',
		width: '180px',
		template: {
			default: 'interfaceName'
		}
	}, {
		type: 'slot',
		label: '上架',
		width: '80px',
		template: {
			default: 'marketd'
		},
	}, {
		type: 'slot',
		label: '启停',
		width: '80px',
		template: {
			default: 'enabled'
		},
	}, {
		type: 'slot',
		label: '操作',
		template: {
			default: 'operation'
		}
	}]
	const {
		loading,
		data,
		send,
		pages,
		onSuccess
	} = useAxios(getProductList, {
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
		openDel(setProductDel,{id:row.id}).then(()=>{
			submit('form')
		})
	}


	const switch_enabled_beforeChange = (row) => {
		const data = {
			'id': row.id,
			'enabled': !row.enabled
		}
		return switch_beforeChange(setProductEnabled,data,row,'enabled_loading')
	}
	
	const switch_marketd_beforeChange = (row) => {
		const data = {
			'id': row.id,
			'marketd': !row.marketd
		}
		return switch_beforeChange(setProductMarketd,data,row,'marketd_loading')
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
				<template #interfaceName="{scope}">
					<div>
					    <div v-for="(item, index) in scope.row.interfaceName.split(',')" :key="index">
					      {{ item }}
					    </div>
					</div>
				</template>
				<template #enabled="{scope}">
					<el-switch v-model="scope.row.enabled" active-text="是" inactive-text="否" inline-prompt
						:loading="scope.row.enabled_loading"
						:before-change="switch_enabled_beforeChange.bind(this,scope.row)" />
				</template>
				<template #marketd="{scope}">
					<el-switch v-model="scope.row.marketd" active-text="是" inactive-text="否" inline-prompt
						:loading="scope.row.marketd_loading"
						:before-change="switch_marketd_beforeChange.bind(this,scope.row)" />
				</template>
				<template #operation="{scope}">
					<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
					<el-button type="primary" text @click="onComDel(scope.row)">删除</el-button>
				</template>
			</Ttable>
		</div>
		<ComEdit ref="ComEditRef" @onSuccess="submit" />
		<ComAdd ref="ComAddRef" @onSuccess="submit" />
	</div>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>