<script setup>
	import { ref, reactive, toRaw, defineAsyncComponent } from 'vue'
	import Tform from '@/components/Templates/Tform.vue';
	import TuploadImg from '@/components/GiUpload/ImageUploader.vue'
	import TuploadPdf from '@/components/GiUpload/fileUpload.vue'
	import { useAxios } from '@/hooks'
	import { up_singleImg, up_singlePdf, getRecoveryDetail, setRecoveryUpdate } from '@/api/index'
	
	const _state = ()=>({
		id:1,
		recoveryAgreement:[],
		recoveryExplanation:[]
	})
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'custom',
			prop:'recoveryAgreement'
		},
		{
			type:'custom',
			prop:'recoveryExplanation'
		}
	]
	const { loading:loadingDetail, onSuccess:onSuccessDetail, onError:onErrorDetail, send:sendDetail } = useAxios(getRecoveryDetail,{
		immediate:false
	});
	
	//初始
	const on_init = ()=> {
		sendDetail()
		onSuccessDetail((res)=>{
			if(res.data){
				ruleForm[keys] = res.data[keys] ?? ''
				if('' != res.data.recoveryAgreement){
					ruleForm.recoveryAgreement = [
						{
							name:res.data.recoveryAgreement ?? '',
							uid:res.data.recoveryAgreement ?? '',
							url:res.data.recoveryAgreement ?? '',
							response:[res.data.recoveryAgreement ?? '']
						}
					]
				}
				if('' != res.data.recoveryExplanation){
					ruleForm.recoveryExplanation = [
						{
							name:res.data.recoveryExplanation ?? '',
							uid:res.data.recoveryExplanation ?? '',
							url:res.data.recoveryExplanation ?? '',
							response:[res.data.recoveryExplanation ?? '']
						}
					]
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
	
	const { loading, data, onSuccess, onError, send } = useAxios(setRecoveryUpdate,{
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
			...ruleForm,
			recoveryAgreement : ruleForm.recoveryAgreement[0].response.data ?? ruleForm.recoveryAgreement[0].response[0],
			recoveryExplanation : ruleForm.recoveryExplanation[0].response.data ?? ruleForm.recoveryExplanation[0].response[0],
		}
		send(data)
	}
	
	//确认
	const confirm = ()=>{
		RefTform.value?.submitForm()
	}
	
	//上传
	const pathSuccess = (response, file, fileList, keys)=>{
		ruleForm[keys] = fileList
	}
	
	//删除
	const pathRemove = (file, fileList, keys)=>{
		ruleForm[keys] = fileList
	}
	
	
</script>

<template>
	<div>
		<div class="content content_form">
			<Tform ref="RefTform" :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" label_width="120px" querytext='修改'>
				<template #recoveryAgreement="scope">
					<el-form-item label="回收协议" :prop="'recoveryAgreement'" :rules="{ required: true, message: '请上传pdf文件' }" label-width="120px">
						<TuploadPdf :action="up_singlePdf" :fileList="ruleForm.recoveryAgreement" @pathSuccess="(response, file, fileList)=>pathSuccess(response, file, fileList, 'recoveryAgreement')" @pathRemove="(file, fileList)=>pathRemove(file, fileList, 'recoveryAgreement')" ></TuploadPdf>
					</el-form-item>
				</template>
				<template #recoveryExplanation="scope">
					<el-form-item label="回收说明" :prop="'recoveryExplanation'" :rules="{ required: true, message: '请上传pdf文件' }" label-width="120px">
						<TuploadPdf :action="up_singlePdf" :fileList="ruleForm.recoveryExplanation" @pathSuccess="(response, file, fileList)=>pathSuccess(response, file, fileList, 'recoveryExplanation')" @pathRemove="(file, fileList)=>pathRemove(file, fileList, 'recoveryExplanation')" ></TuploadPdf>
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
