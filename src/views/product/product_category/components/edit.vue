<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Tform from '@/components/Templates/Tform.vue';
	import { useAxios } from '@/hooks'
	import { setProductCategoryEdit } from '@/api/index'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '修改',
		width:'580px',
		isShow: false,
		modal:true,
		draggable:true
	})
	
	const _state = ()=>({
		id:'',
		categoryName:'',
		pid:'',
		categorySort:''
	})
		
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'input',
			label: '分类名称',
			prop: 'categoryName',
			rules: { required: true, message: '请输入分类名称' }
		},{
			type: 'select',
			label: '所属父类',
			prop: 'pid',
			_url: '/productCategory/category',
			filterable: true,
			rules: { required: true, message: '请输入运营商' },
			disabled:true
		},
		{
			type:'input',
			label: '排序',
			prop: 'categorySort',
			rules: { required: true, message: '请输入排序' }
		}
	]
	//open初始
	const on_init = (row)=> {
		Update.isShow = true
		for(let keys in ruleForm){
			ruleForm[keys] = row[keys] ?? ''
		}
	}
	//关闭
	const RefTform = ref(null)
	const close = ()=>{
		RefTform.value?.resetForm()
	}
	
	const { loading, data, onSuccess, onError, send } = useAxios(setProductCategoryEdit,{
		immediate:false
	});
	onSuccess((res)=>{
		ElNotification.success({
			title: '提示',
			message: res.message || '新增成功!',
			duration: 3000
		})
		emit('onSuccess')
		Update.isShow = false
	})
	onError((res)=>{
		ElNotification.error({
			title: '提示',
			message:  res.message || '新增失败！',
			duration: 3000
		})
	})
	
	//提交
	const submit = (type)=>{
		send(ruleForm)
	}
	//确认
	const confirm = ()=>{
		RefTform.value?.submitForm()
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" :loading="loading" @confirm="confirm" @close="close">
		<Tform ref="RefTform" :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" label_width="120px" btn_hide>
			
		</Tform>
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
