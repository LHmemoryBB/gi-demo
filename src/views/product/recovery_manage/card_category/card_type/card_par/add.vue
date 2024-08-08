<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Tform from '@/components/Templates/Tform.vue';
	import { useAxios } from '@/hooks'
	import { setCardParAdd } from '@/api/index'
	import { notification } from 'ant-design-vue'
	const emit = defineEmits();
	let Update = reactive({
		title: '新增',
		width:'580px',
		isShow: false,
		modal:true,
		draggable:true
	})
	
	const _state = ()=>({
		categoryCode:'',
		typeCode:'',
		parCode:'',
		discount:'',
		parSort:1,
		parDescribe:''
	})
		
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type: 'select',
			label: '面值名称',
			prop: 'parCode',
			_url: '/cardPar/selectCardPar',
			_value:'value',
			_label:'text',
			filterable: true,
			rules: { required: true, message: '请选择面值名称' },
			default_not_request: true
		},
		{
			type:'custom',
			prop:'discount',
		},{
			type:'input',
			label: '排序',
			prop: 'parSort',
			rules: { required: true, message: '请输入排序' }
		},{
			type:'input',
			label: '描述',
			prop: 'parDescribe',
			rules: { required: true, message: '请输入描述' }
		}
	]
	//open初始
	const on_init = (ruleform)=> {
		Update.isShow = true
		Object.assign(ruleForm, _state())
		ruleForm.categoryCode = ruleform.categoryCode
		ruleForm.typeCode = ruleform.typeCode
	}
	//关闭
	const RefTform = ref(null)
	const close = ()=>{
		RefTform.value?.resetForm()
	}
	
	const { loading, data, onSuccess, onError, send } = useAxios(setCardParAdd,{
		immediate:false
	});
	onSuccess((res)=>{
		notification.success({
			message: '提示',
			description: res.message || '新增成功!',
		})
		emit('onSuccess')
		Update.isShow = false
	})
	onError((res)=>{
		notification.error({
			message: '提示',
			description:  res.message || '新增失败！',
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
			<template #discount="scope">
				<a-form-item label="回收百分比" :rules="{ required: true, message: '请输入回收百分比,范围0-100'}" name="discount" lalabel-width="120px">
					<a-input v-model="ruleForm.discount" ></a-input>
					<div style="color: red;">范围(0-100)%,注意是百分比！！！</div>
				</a-form-item>
			</template>
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
