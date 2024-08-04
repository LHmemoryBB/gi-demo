<script setup>
	import { ref, reactive, defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Tform from '@/components/Templates/Tform.vue';
	import { useAxios } from '@/hooks'
	import { up_image,setCardTypeAdd } from '@/api/index'
	import TuploadImg from '@/components/GiUpload/ImageUploader.vue'
	import Tselect from '@/components/Templates/Tselect.vue'
	
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
		background:[],
		flag:'',
		tip:'',
		discount:true,
		valid:true,
		validMinDay:'',
		submitTip:'',
		typeSort:1
	})
		
	const ruleForm = reactive(_state());
	const listInput = [{
			type: 'select',
			label: '卡种名称',
			prop: 'typeCode',
			_url: '/cardType/selectCardType',
			_value:'value',
			_label:'text',
			filterable: true,
			rules: { required: true, message: '请选择卡种名称' },
			default_not_request: true
		},{
			type:'custom',
			label: '背景图标',
			prop:'background'
		},{
			type:'input',
			label: '标记字符',
			prop: 'flag',
			rules: { required: false, message: '请输入标记字符' }
		},
		{
			type:'input',
			label: '折扣提示',
			prop: 'tip',
			rules: { required: false, message: '请输入折扣提示' }
		},
		{
			type:'custom',
			prop:'discount'
		},
		{
			type:'custom',
			prop:'valid'
		},
		{
			type:'custom',
			prop:'validMinDay'
		},{
			type:'textarea',
			label: '提交提示',
			prop: 'submitTip',
			length: 300,
			style:'width:90%',
			rules: { required: true, message: '请输入卡号卡密的提交提示' }
		},{
			type:'input',
			label: '排序',
			prop: 'typeSort',
			rules: { required: true, message: '请输入排序' }
		}
	]
	//open初始
	const on_init = (ruleform)=> {
		Update.isShow = true
		Object.assign(ruleForm, _state())
		ruleForm.categoryCode = ruleform.categoryCode
	}
	//关闭
	const RefTform = ref(null)
	const close = ()=>{
		RefTform.value?.resetForm()
	}
	
	const { loading, data, onSuccess, onError, send } = useAxios(setCardTypeAdd,{
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
			background:ruleForm.background.map(item => item.response[0])[0],
		}
		send(data)
	}
	//确认
	const confirm = ()=>{
		RefTform.value?.submitForm()
	}
	
	//图片上传
	const pathSuccess = (response, file, fileList)=>{
		ruleForm.background = fileList
	}
	//图片删除
	const pathRemove = (file, fileList)=>{
		ruleForm.background = fileList
	}
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update" :loading="loading" @confirm="confirm" @close="close">
		<Tform ref="RefTform" :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" label_width="120px" btn_hide>
			<template #discount="scope">
				<el-form-item label="填写折扣" prop="discount" label-width="120px">
					<el-switch
					    v-model="ruleForm.discount"
						active-text="是"
						inactive-text="否"
						inline-prompt
					  />
				</el-form-item>
			</template>
			<template #valid="scope">
				<el-form-item label="填写有效期" prop="valid" label-width="120px">
					<el-switch
					    v-model="ruleForm.valid"
						active-text="是"
						inactive-text="否"
						inline-prompt
					  />
				</el-form-item>
			</template>
			<template #validMinDay="scope">
				<el-form-item v-if="ruleForm.valid==true" label="最小有效期" prop="validMinDay" :rules="{ required: true, message: '请填写最小有效期' }" label-width="120px">
					<el-input style="width: 200px;" placeholder="请填写最小有效期" v-model="ruleForm.validMinDay" ></el-input>
				</el-form-item>
			</template>
			<template #background="scope">
				<el-form-item label="背景图标" :prop="'background'" :rules="{ required: true, message: '请添加图片' }" label-width="120px">
					<TuploadImg :up_img_api="up_image" :fileList="ruleForm.background" :size="1024*1024" sizeName="1MB" :limit="1" @pathSuccess="pathSuccess" @pathRemove="pathRemove"></TuploadImg>
				</el-form-item>
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
