<script setup>
	import { reactive, ref } from 'vue';
	import { useAxios } from '@/hooks'
	import { setBlackInfoList, setBlackInfoDel } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { defineAsyncComponent } from 'vue';
	import { openDel } from '@/hooks/_del'

	const ComEdit = defineAsyncComponent(() => import('./components/edit.vue'))
	const ComAdd = defineAsyncComponent(() => import('./components/add.vue'))
	
	const ruleForm = reactive({
		phone: ''
	})
	
	const listInput = [{
			type: 'input',
			label: '手机号',
			prop: 'phone',
			placeholder: '请输入手机号',
		}
	]
	const headers = [{
		label: '手机号',
		prop: 'phone'
	},{
		label: '拉黑时间',
		prop: 'createDate'
	},{
		label: '截止时间',
		prop: 'expireDate'
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
	} = useAxios(setBlackInfoList, {
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
	
	const onComDel = (row) => {
		openDel(setBlackInfoDel,{id:row.id}).then(()=>{
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