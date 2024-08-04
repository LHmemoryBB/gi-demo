<script setup>
	import { reactive, ref, defineAsyncComponent } from 'vue';
	import useAxios from '@/hooks/useAxios'
	import { getUserList, setUserEnabled, getUserExport } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { openExport } from '@/hooks/export';
	import { switch_beforeChange } from '@/hooks/Tswitch';

	const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
	const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
	const ComResetPassword = defineAsyncComponent(() => import('./components/resetPassword.vue'))
	const ComResetApiKey = defineAsyncComponent(() => import('./components/resetApiKey.vue'))
	const ComBalance = defineAsyncComponent(() => import('./components/balance.vue'))
	const ComResource = defineAsyncComponent(() => import('./components/resource.vue'))
	const ComPrice = defineAsyncComponent(() => import('./components/price.vue'))
	const ComTransaction = defineAsyncComponent(() => import('./components/transaction.vue'))
	const ComBalanceLog = defineAsyncComponent(() => import('./components/balanceLog.vue'))

	const ruleForm = reactive({
		userName: '',
		phone: '',
		enabled: ''
	})
	const listInput = [{
			type: 'input',
			label: '用户名',
			prop: 'userName',
			placeholder: '请输入用户名',
		},
		{
			type: 'input',
			label: '联系方式',
			prop: 'phone',
			placeholder: '请输入联系方式',
		},
		{
			type: 'select',
			label: '状态',
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
			placeholder: '请选择状态',
			default_not_request: true
		}
	]
	const headers = [{
		label: '商户ID',
		prop: 'id'
	},{
		label: '角色',
		prop: 'roleStr'
	},{
		label: '用户名',
		prop: 'userName'
	}, {
		label: '联系方式',
		prop: 'phone'
	}, {
		label: '注册时间',
		prop: 'createDate'
	}, {
		label: '余额',
		prop: 'balance'
	}, {
		type: 'slot',
		label: '状态',
		template: {
			default: 'enabled'
		},
	}, {
		type: 'slot',
		label: '操作',
		width:	'560px',
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
	} = useAxios(getUserList, {
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
	
	const ComAddRef = ref();
	const onComAdd = () => {
		ComAddRef.value?.on_init()
	}
	
	const ComResetPasswordRef = ref();
	const onResetPasswordRef = (row) => {
		ComResetPasswordRef.value?.on_init(row)
	}
	
	const ComResetApiKeyRef = ref();
	const onResetApiKeyRef = (row) => {
		ComResetApiKeyRef.value?.on_init(row)
	}
	
	const ComBalanceRef = ref();
	const onComBalance = (row) => {
		ComBalanceRef.value?.on_init(row)
	}
	
	const ComResourceRef = ref();
	const onComResource = (row) => {
		ComResourceRef.value?.on_init(row)
	}
	
	const ComPriceRef = ref();
	const onComPrice = (row) => {
		ComPriceRef.value?.on_init(row)
	}
	
	const ComTransactionRef = ref();
	const onComTransaction = (row) => {
		ComTransactionRef.value?.on_init(row)
	}
	
	const ComBalanceLogRef = ref();
	const onComBalanceLog = (row) => {
		ComBalanceLogRef.value?.on_init(row)
	}

	const switch_enabled_beforeChange = (row) => {
		const data = {
			'id': row.id,
			'enabled': !row.enabled
		}
		return switch_beforeChange(setUserEnabled,data,row,'enabled_loading')
	}

	const open = () => {
		const data = {
			...ruleForm,
			page: 0,
			size: 0
		}
		openExport(getUserExport,data)
	}
</script>

<template>
	<div>
		<div class="content content_form">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit"
				@resetForm="resetForm" inline></Tform>
		</div>
		<div class="content">
			<el-button type="primary" plain icon="Download" @click="open()">导出数据</el-button>
			<el-button type="primary" @click="onComAdd()">新增</el-button>
			<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
				<template #enabled="{scope}">
					<el-switch v-model="scope.row.enabled" active-text="是" inactive-text="否" inline-prompt
						:loading="scope.row.enabled_loading"
						:before-change="switch_enabled_beforeChange.bind(this,scope.row)" />
				</template>
				<template #operation="{scope}">
					<div class="_btn"></div>
					<el-button type="primary" text @click="onComBalance(scope.row)">充值</el-button>
					<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
					<el-button type="primary" text @click="onResetPasswordRef(scope.row)">重置密码</el-button>
					<el-button type="primary" text @click="onResetApiKeyRef(scope.row)">重置秘钥</el-button>
					<el-button type="primary" text @click="onComResource(scope.row)">资料填写</el-button>
					<el-button type="primary" text @click="onComPrice(scope.row)">价格自定义</el-button>
					<el-button type="primary" text @click="onComTransaction(scope.row)">用户账单</el-button>
					<el-button type="primary" text @click="onComBalanceLog(scope.row)">余额日志</el-button>
				</template>
			</Ttable>
		</div>
		<ComEdit ref="ComEditRef" @onSuccess="submit" />
		<ComAdd ref="ComAddRef" @onSuccess="submit" />
		<ComResetPassword ref="ComResetPasswordRef" @onSuccess="submit" />
		<ComResetApiKey ref="ComResetApiKeyRef" @onSuccess="submit" />
		<ComBalance ref="ComBalanceRef" @onSuccess="submit" />
		<ComResource ref="ComResourceRef" @onSuccess="submit" />
		<ComPrice ref="ComPriceRef" @onSuccess="submit" />
		<ComTransaction ref="ComTransactionRef" />
		<ComBalanceLog ref="ComBalanceLogRef" />
	</div>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>