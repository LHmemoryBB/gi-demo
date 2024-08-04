<script setup>
	import { ref, reactive,defineAsyncComponent } from 'vue'
	import { useAxios } from '@/hooks'
	import { getCardCategory, setCardCategoryDel } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import { openDel } from '@/hooks/_del'
	
	const ComAdd = defineAsyncComponent(() => import('./card_category/add.vue'))
	const ComEdit = defineAsyncComponent(() => import('./card_category/edit.vue'))
	const ComCardType = defineAsyncComponent(() => import('./card_category/cardType.vue'))
	
	const ruleForm = reactive({
		categoryName: '',
	})
	
	const listInput = [{
			type: 'input',
			label: '卡类名称',
			prop: 'categoryName',
			placeholder: '请输入卡类名称',
		}
	]
	
	const headers = [{
		label: '卡类名称',
		prop: 'categoryName',
	}, {
		type: 'slot',
		label: '背景色',
		template: {
			default: 'color'
		}
	}, {
		label: '卡片图标',
		prop: 'icon'
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
	} = useAxios(getCardCategory, {
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
		openDel(setCardCategoryDel,{id:row.id}).then(()=>{
			submit('form')
		})
	}
	
	const ComCardTypeRef = ref();
	const onComCardType = (row) => {
		ComCardTypeRef.value?.on_init(row)
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
				<template #color="{scope}">
					<el-button :color="scope.row.color"></el-button>
				</template>
				<template #operation="{scope}">
					<div class="_btn"></div>
					<el-button type="primary" text @click="onComEdit(scope.row)">编辑</el-button>
					<el-button type="primary" text @click="onComCardType(scope.row)">配置卡种</el-button>
					<el-button type="primary" text @click="onComDel(scope.row)">删除</el-button>
				</template>
			</Ttable>
		</div>
		<ComEdit ref="ComEditRef" @onSuccess="submit('form')" />
		<ComAdd ref="ComAddRef" @onSuccess="submit('form')" />
		<ComCardType ref="ComCardTypeRef" /> 
	</div>
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
