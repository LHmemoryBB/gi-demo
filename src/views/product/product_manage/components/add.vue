<script setup>
	import { ref, computed, reactive, defineEmits, defineExpose,
	 defineAsyncComponent } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Tform from '@/components/Templates/Tform.vue';
	import { useAxios } from '@/hooks'
	import { up_image, setProductAdd } from '@/api/index'
	import TuploadImg from '@/components/GiUpload/ImageUploader.vue'
	import WangEdior from '@/components/WangEdior/index.vue'
	
	const ComInterfaceProductList = defineAsyncComponent(() => import('./interfaceProductList.vue'))
	const ComInterfaceProductDetails = defineAsyncComponent(() => import('./interfaceProductDetails.vue'))

	
	// 定义子组件向父组件传值/事件
	const emit = defineEmits();
	let Update = reactive({
		title: '新增',
		width:'680px',
		isShow: false,
		modal:false,
		draggable:false
	});
	
	const _state = ()=>({
			categoryId:'',
			productName:'',
			title:'',
			description:'',
			image:[],
			operator:'',
			whiteAreas:'',
			blackAreas:'',
			par:'',
			price:'',
			fills: '',
			marketd: false,
			recommend: false,
			enabled: false,
			warned: false,
			warnTime: '',
			pollingType: '',
			interfaceConfigs:[
				{
					interfaceId: '',
					interfaceProductId: '',
					interfaceSort:'',
					interfaceName: '',
					interfaceProductName: '',
					pollingTime: 1
				}
			]
	});
		
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type: 'select',
			label: '所属分类',
			prop: 'categoryId',
			_url: '/productCategory/category',
			filterable: true,
			rules: { required: true, message: '请输入所属分类' }
		},
		{
			type:'input',
			label: '产品名称',
			prop: 'productName',
			rules: { required: true, message: '请输入产品名称' }
		},
		{
			type:'input',
			label: '副标题',
			prop: 'title',
			rules: { required: false, message: '请输入副标题' }
		},
		{
			type:'custom',
			label: '产品主图',
			prop: 'image',
		},
		{
			type: 'select',
			label: '运营商',
			prop: 'operator',
			_url: '/product/operator',
			filterable: true,
			rules: { required: false, message: '请输入运营商' },
		},
		{
			type: 'select',
			label: '允许地区',
			prop: 'whiteAreas',
			_url: '/blackInfo/area',
			_value:'value',
			_label:'text',
			filterable: true,
			// rules: { required: true, message: '请选择运允许地区' },
			multiple: true,
			default_not_request: true
		},
		{
			type: 'select',
			label: '限制地区',
			prop: 'blackAreas',
			_url: '/blackInfo/area',
			_value:'value',
			_label:'text',
			filterable: true,
			// rules: { required: true, message: '请选择运限制地区' },
			multiple: true,
			default_not_request: true
		},
		{
			type:'input',
			label: '面值',
			prop: 'par',
			rules: { required: false, message: '请输入面值' }
		},
		{
			type:'input',
			label: '价格',
			prop: 'price',
			rules: { required: false, message: '请输入价格' }
		},
		{
			type: 'select',
			label: '购买信息',
			prop: 'fills',
			_url: '/product/fillInfo',
			_value:'value',
			_label:'text',
			// rules: { required: true, message: '请选择运允许地区' },
			multiple: true,
			default_not_request: true
		},
		{
			type:'custom',
			prop:'marketd'
		},
		{
			type:'custom',
			prop:'recommend'
		},
		{
			type:'custom',
			prop:'enabled'
		},
		{
			type:'custom',
			prop:'warned'
		},
		{
			type:'custom',
			prop:'warnTime'
		},
		{
			type: 'select',
			label: '调用方式',
			prop: 'pollingType',
			_url: '/product/pollingType',
			filterable: true,
			rules: { required: true, message: '请输入调用方式' },
		},
		{
			type:'custom',
			prop:'interfaceId'
		},{
			type:'custom',
			prop:'description'
		}
	];
	
	//open初始
	const on_init = ()=> {
		Update.isShow = true
		Object.assign(ruleForm, _state())
		
	};
	//关闭
	const RefTform = ref(null)
	const close = ()=>{
		RefTform.value?.resetForm()
	};
	
	const { loading, data, onSuccess, onError, send } = useAxios(setProductAdd,{
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
	});
	
	onError((res)=>{
		ElNotification.error({
			title: '提示',
			message:  res.message || '新增失败！',
			duration: 3000
		})
	});
	
	
	//提交
	const submit = (type)=>{
		let data = {
			...ruleForm,
			image:ruleForm.image.map(item=> item.response[0])[0]
		}
		send(data)
	};
	//确认
	const confirm = ()=>{
		RefTform.value?.submitForm()
	};
	
	//图片上传
	const pathSuccess = (response, file, fileList)=>{
		ruleForm.image = fileList
	};
	//图片删除
	const pathRemove = (file, fileList)=>{
		ruleForm.image = fileList
	};
	
	function hasDuplicateId(arr,key) {
		const idSet = new Set();
		for (let i = 0; i < arr.length; i++) {
			if (idSet.has(arr[i].key)) {
				return true; // 有相同的id
			}
			idSet.add(arr[i].key);
		}
		return false; // 没有相同的id
	}
	
	let interfaceConfigsIndex = 0;
	const ComInterfaceProductListRef = ref();
	const onComInterfaceProductList = (index) => {
		interfaceConfigsIndex = index
		ComInterfaceProductListRef.value?.on_init()
	};
	
	const ComInterfaceProductDetailsRef = ref();
	const onComInterfaceProductDetails = (index) => {
		interfaceConfigsIndex = index
		ComInterfaceProductDetailsRef.value?.on_init(ruleForm.interfaceConfigs[index].interfaceId)
	};
	
	//接口配置选择返回
	const onChoice = (type, row)=>{
		if(type == 'interfaceProductList'){
			ruleForm.interfaceConfigs[interfaceConfigsIndex].interfaceId = row.id
			ruleForm.interfaceConfigs[interfaceConfigsIndex].interfaceName = row.interfaceName
			ruleForm.interfaceConfigs[interfaceConfigsIndex].interfaceSort = row.interfaceSort
		}else{
			ruleForm.interfaceConfigs[interfaceConfigsIndex].interfaceProductId = row.id
			ruleForm.interfaceConfigs[interfaceConfigsIndex].interfaceProductName = row.productName
		}
	};
	
	const interfaceNameRemove = (index)=>{
		if(ruleForm.interfaceConfigs.length <= 1) return
		ruleForm.interfaceConfigs.splice(index,1)
	};
	
	
	const interfaceNameAdd = (index)=>{
		ruleForm.interfaceConfigs.push({
					interfaceId: '',
					interfaceProductId: '',
					interfaceSort:'',
					interfaceName: '',
					interfaceProductName: '',
					pollingTime: 1
				})
	};
	
	defineExpose({
		on_init
	})
	
</script>

<template>
	<Tdialog :Update="Update" :loading="loading" @confirm="confirm" @close="close">
		<Tform ref="RefTform" :loading="loading" :ruleForm="ruleForm" :listInput="listInput" @submit="submit" label_width="120px" btn_hide>
			<template #image="scope">
				<el-form-item label="商品主图" :prop="'image'"  label-width="120px">
					<TuploadImg :up_img_api="up_image" :fileList="ruleForm.image" :size="1024*1024*10" sizeName="10MB" :limit="1" multiple @pathSuccess="pathSuccess" @pathRemove="pathRemove"></TuploadImg>
				</el-form-item>
			</template>
			<template #recommend="scope">
				<el-form-item label="是否推荐" prop="recommend" label-width="120px">
					<el-switch
					    v-model="ruleForm.recommend"
						active-text="是"
						inactive-text="否"
						inline-prompt
					  />
				</el-form-item>
			</template>
			<template #marketd="scope">
				<el-form-item label="是否上架" prop="marketd" label-width="120px">
					<el-switch
					    v-model="ruleForm.marketd"
						active-text="是"
						inactive-text="否"
						inline-prompt
					  />
				</el-form-item>
			</template>
			<template #enabled="scope">
				<el-form-item label="是否启用" prop="enabled" label-width="120px">
					<el-switch
					    v-model="ruleForm.enabled"
						active-text="是"
						inactive-text="否"
						inline-prompt
					  />
				</el-form-item>
			</template>
			<template #warned="scope">
				<el-form-item label="超时提醒" prop="warned" label-width="120px">
					<el-switch
					    v-model="ruleForm.warned"
						active-text="是"
						inactive-text="否"
						inline-prompt
					  />
				</el-form-item>
			</template>
			<template #warnTime="scope">
				<el-form-item v-if="ruleForm.warned==true" label="超时时长" prop="warnTime" :rules="{ required: true, message: '请填写超时时长' }" label-width="120px">
					<el-input style="width: 200px;" placeholder="超时时长,单位分钟,请不要超过999" v-model="ruleForm.warnTime" ></el-input>
				</el-form-item>
			</template>
			<template #interfaceId="scope">
				<TransitionGroup tag="ul" name="fade">
					<div v-for="(item, index) in ruleForm.interfaceConfigs" :key="item">
						<el-form-item label="接口配置" :prop="'interfaceConfigs.' + index + '.interfaceName'" label-width="120px" :rules="{ required: true, message: '请选择接口配置' }">
							<div class="fx">
								<el-input v-model="item.interfaceName" disabled></el-input>
								<el-button type="primary" style="margin-left: 10px;" @click="onComInterfaceProductList(index)">选择接口配置</el-button>
								<el-button class="m_l_10" type="danger" icon="DeleteFilled" v-if="ruleForm.interfaceConfigs.length > 1" @click="interfaceNameRemove(index)"></el-button>
								<el-button class="m_l_10" type="primary" icon="Plus" @click="interfaceNameAdd(index)"></el-button>
							</div>
						</el-form-item>
						<el-form-item label="接口套餐" :prop="'interfaceConfigs.' + index + '.interfaceProductName'" label-width="120px" :rules="{ required: true, message: '请选择接口套餐' }">
							<div class="fx">
								<el-input v-model="item.interfaceProductName" disabled></el-input>
								<el-button type="primary" style="margin-left: 10px;" v-show="item.interfaceId" @click="onComInterfaceProductDetails(index)">选择接口套餐</el-button>
							</div>
						</el-form-item>
						<el-form-item label="次/权重" :prop="'interfaceConfigs.' + index + '.pollingTime'" :rules="{ required: true, message: '请填写次数/权重' }" label-width="120px">
							<el-input style="width: 200px;" placeholder="控制10以内，范围[0,100]" v-model="item.pollingTime" ></el-input>
						</el-form-item>
						
				    </div>
				</TransitionGroup>
			</template>
			
			<template #description="scope">
				<wang-edior v-model="ruleForm.description"></wang-edior>
			</template>
		</Tform>
		<ComInterfaceProductList ref="ComInterfaceProductListRef" @interfaceId="onChoice" />
		<ComInterfaceProductDetails ref="ComInterfaceProductDetailsRef" @interfaceId="onChoice" />
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
	.editor_sure {
		height: 50px;
		display: flex;
		flex-direction: column;
	
		p {
			margin: 8px 0 8px 0;
			border-bottom: 1px solid #dcdfe6;
		}
		div {
			display: flex;
			justify-content: flex-end;
			button {
				margin: 0 2px;
			}
		}
	}
</style>


