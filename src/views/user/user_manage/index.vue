<script setup>
	import { reactive, ref, defineAsyncComponent } from 'vue';
	import { useAxios, openExport, switch_beforeChange } from '@/hooks'
	import { getUserList, setUserEnabled, getUserExport } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { DownloadOutlined } from '@ant-design/icons-vue'
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
		title: '商户ID',
		align: 'center',
		dataIndex: 'id'
	},{
		title: '角色',
		align: 'center',
		dataIndex: 'roleStr'
	},{
		title: '用户名',
		align: 'center',
		dataIndex: 'userName'
	}, {
		title: '联系方式',
		align: 'center',
		dataIndex: 'phone'
	}, {
		title: '注册时间',
		align: 'center',
		dataIndex: 'createDate'
	}, {
		title: '余额',
		align: 'center',
		dataIndex: 'balance'
	}, {
		type: 'slot',
		title: '状态',
		align: 'center',
		dataIndex: 'enabled'
	}, {
		type: 'slot',
		title: '操作',
		width:	'560px',
		align: 'center',
		dataIndex: 'operation'
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
	<div class="page-container">
		<div class="form-container">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit"
				@resetForm="resetForm" layout="inline"></Tform>
		</div>
		<div class="table-container">
			<a-button type="primary" @click="open()"><DownloadOutlined />导出数据</a-button>
			<a-button type="primary" @click="onComAdd()" style="margin-left:20px" >新增</a-button>
			<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
				<template #enabled="{record}">
					<a-switch v-model:checked="record.enabled" checked-children="是" un-checked-children="否"
						:loading="record.enabled_loading"
						@change="() =>switch_enabled_beforeChange(record)" />
				</template>
				<template #operation="{record}">
					<a-button type="primary" ghost @click="onComBalance(record)" class="m_l_10 m_b_10" size="small">充值</a-button>
					<a-button type="primary" ghost @click="onComEdit(record)" class="m_l_10 m_b_10" size="small">编辑</a-button>
					<a-button type="primary" ghost @click="onResetPasswordRef(record)" class="m_l_10 m_b_10" size="small">重置密码</a-button>
					<a-button type="primary" ghost @click="onResetApiKeyRef(record)" class="m_l_10 m_b_10" size="small">重置秘钥</a-button>
					<a-button type="primary" ghost @click="onComResource(record)" class="m_l_10 m_b_10" size="small">资料填写</a-button>
					<a-button type="primary" ghost @click="onComPrice(record)" class="m_l_10 m_b_10" size="small">价格自定义</a-button>
					<a-button type="primary" ghost @click="onComTransaction(record)" class="m_l_10 m_b_10" size="small">用户账单</a-button>
					<a-button type="primary" ghost @click="onComBalanceLog(record)" class="m_l_10 m_b_10" size="small">余额日志</a-button>
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