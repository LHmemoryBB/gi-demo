<script setup>
	import { ref, reactive, toRaw , defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Tform from '@/components/Templates/Tform.vue';
	import useAxios from '@/hooks/useAxios'
	import { setResetPassword } from '@/api/index'
	import md5 from 'js-md5';
	
	const emit = defineEmits();
	let Update = reactive({
		title: '重置密码',
		width:'580px',
		isShow: false,
		modal:true,
		draggable:true
	})
	
	const _state = ()=>({
		userId:'',
		password:''
	})
	const validatorPhone = (rule, value, callback) => {
		const reg = /^1[3456789]\d{9}$/;
		if (!reg.test(value)) {
			callback(new Error('请输入正确的手机号'));
		} else {
			callback();
		}
	}
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'input',
			label: '新密码',
			prop: 'password',
			rules: { required: true, message: '请输入新密码' }
		}
	]
	//open初始
	const on_init = (row)=> {
		row = toRaw(row)
		Update.isShow = true
		ruleForm['userId'] = row['id'] ?? ''
	}
	//关闭
	const RefTform = ref(null)
	const close = ()=>{
		RefTform.value?.resetForm()
	}
	
	const { loading, data, onSuccess, onError, send } = useAxios(setResetPassword,{
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
		let data = {
			...ruleForm,
			password:md5(ruleForm.password),
		}
		send(data)
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
