<script setup>
	import { reactive, ref } from 'vue';
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { useAxios } from '@/hooks'
	import { openChangeStatus } from '@/hooks/_del'
	import { getUserApplyList,setApplyApproved } from '@/api/index'
	
	const ruleForm = reactive({
		startDate:'',
		endDate:'',
		userName: '',
		actionType: 2,
		approved: ''
	})
	
	const listInput = [{
			type:'time',
			_type:'datetimerange',
			label:'日期选择',
			prop: ['##datetimerange'],
			_prop: ['startDate','endDate'],
			format:'YYYY-MM-DD HH:mm:ss',
			placeholder:['开始日期','结束日期'],
		},{
			type: 'input',
			label: '用户名称',
			prop: 'userName',
			placeholder: '请输入用户名称',
		},{
			type: 'input',
			label: '记录编号',
			prop: 'applyCode',
			placeholder: '请输入记录编号',
		},{
			type: 'select',
			label: '审核结果',
			prop: 'approved',
			options: [{
					value: '通过',
					id: 1
				},
				{
					value: '不通过',
					id: 0
				}
			],
			placeholder: '请选择审核结果',
			default_not_request: true
		}
	]
	
	const headers = [{
		label: '申请时间',
		prop: 'createDate'
	},{
		label: '申请人',
		prop: 'userName'
	},{
		label: '记录编号',
		prop: 'applyCode'
	},{
		type: 'slot',
		label: '收款码',
		template: {
			default: 'paymentCode'
		}
	},{
		label: '充值金额',
		prop: 'balance'
	},{
		label: '提现账号',
		prop: 'account'
	},{
		label: '真实姓名',
		prop: 'realName'
	},{
		label: '转账方式',
		prop: 'transTypeStr'
	},{
		type: 'slot',
		label: '操作',
		width: '100px',
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
	} = useAxios(getUserApplyList, {
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

	const onApproved = (type,row) => {
		openChangeStatus(setApplyApproved,{id:row.id,approved:type}, '确定操作吗？').then(()=>{
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
			<Ttable :loading="loading" :headers="headers" :tableData="data" :pages="pages">
				<template #paymentCode="{scope}">
					<el-image style="width: 100px; height: 100px" :src="scope.row.paymentCode" fit />
				</template>

				<template #operation="{scope}">
					<div class="btn">
						<template v-if="!scope.row.checked">
							<el-button type="primary" text @click="onApproved(true,scope.row)">通过</el-button>
							<el-button type="primary" text @click="onApproved(false,scope.row)">拒绝</el-button>
						</template>
					</div>
				</template>
			</Ttable>
		</div>
	</div>
</template>

<style scoped>
	.img {
		width: 50px;
		height: 50px;
	}
</style>
