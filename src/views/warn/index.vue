<script setup>
	import { ref, reactive, toRaw, defineAsyncComponent } from 'vue'
	import Tform from '@/components/Templates/Tform.vue';
	import { useAxios } from '@/hooks'
	import { getMail,setMailUpdate } from '@/api/index'
	
	const _state = ()=>({
		mailHost:'',
		mailPort:'',
		mailFrom:'',
		id:1,
		mailAuth:true,
		mailUser:'',
		mailPass:'',
		mailTo:''
	})
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'input',
			label: '发送域名',
			prop: 'mailHost',
			rules: { required: true, message: '请填写域名' }
		},{
			type:'input',
			label: '发送端口',
			prop: 'mailPort',
			rules: { required: true, message: '请填写发送端口' }
		},{
			type:'input',
			label: '发件人',
			prop: 'mailFrom',
			placeholder: '收件人，name <user@xxx.xx>',
			rules: { required: true, message: '请填写发件人' }
		},
		{
			type:'custom',
			prop:'mailAuth'
		},
		{
			type:'input',
			label: '用户名',
			prop: 'mailUser',
			rules: { required: true, message: '请填写用户名' }
		},
		{
			type:'input',
			label: '密码',
			prop: 'mailPass',
			rules: { required: true, message: '请填写密码' }
		},
		{
			type:'input',
			label: '收件人',
			prop: 'mailTo',
			placeholder: '收件人，多个收件人逗号或者分号隔开',
			rules: { required: true, message: '请填写收件人' }
		}
	]
	const { loading:loadingDetail, onSuccess:onSuccessDetail, onError:onErrorDetail, send:sendDetail } = useAxios(getMail,{
		immediate:false
	});
	
	//初始
	const on_init = ()=> {
		sendDetail()
		onSuccessDetail((res)=>{
			if(res.data){
				for(let keys in ruleForm){
					ruleForm[keys] = res.data[keys] ?? ''
				}
			}
			
		})
		onErrorDetail((res)=>{
			ElNotification.error({
				title: '提示',
				message:  res.message || '数据异常！',
				duration: 3000
			})
		})
	}
	on_init()
	
	//关闭
	const RefTform = ref(null)
	const close = ()=>{
		RefTform.value?.resetForm()
	}
	
	const { loading, data, onSuccess, onError, send } = useAxios(setMailUpdate,{
		immediate:false
	});
	onSuccess((res)=>{
		ElNotification.success({
			title: '提示',
			message: res.message || '修改成功!',
			duration: 3000
		})
	})
	onError((res)=>{
		ElNotification.error({
			title: '提示',
			message:  res.message || '修改失败！',
			duration: 3000
		})
	})
	
	//提交
	const submit = (type)=>{
		let data = {
			...ruleForm
		}
		send(data)
	}
	
	//确认
	const confirm = ()=>{
		RefTform.value?.submitForm()
	}
	
	
</script>

<template>
	<div>
		<div class="content content_form">
			<Tform ref="RefTform" :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" label_width="120px" querytext='修改'>
				<template #mailAuth="scope">
					<el-form-item label="是否认证" prop="mailAuth" label-width="120px">
						<el-switch
						    v-model="ruleForm.mailAuth"
							active-text="是"
							inactive-text="否"
							inline-prompt
						  />
					</el-form-item>
				</template>
				
			</Tform>
		</div>
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
