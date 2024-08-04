<script setup>
	import { ref, reactive, toRaw,defineEmits, defineExpose } from 'vue'
	import Tdialog from '@/components/Templates/Tdialog.vue';
	import Tform from '@/components/Templates/Tform.vue';
	import { useAxios } from '@/hooks'
	
	const emit = defineEmits();
	let Update = reactive({
		title: '修改',
		width:'580px',
		isShow: false,
		modal:true,
		draggable:true
	})
	
	const _state = ()=>({
		voucher:''
	})
	const ruleForm = reactive(_state());
	const listInput = [
		{
			type:'input',
			label: '凭证',
			prop: 'voucher',
			disabled:true
		}
	]
	//open初始
	const on_init = (row)=> {
		row = toRaw(row)
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
	
	// const { loading, data } = useAxios(setUserEdit,{
	// 	immediate:false
	// });
	
	defineExpose({
		on_init
	})
</script>

<template>
	<Tdialog :Update="Update"  footer_hide @close="close">
		<Tform ref="RefTform"  :ruleForm="ruleForm" :listInput="listInput" label_width="120px" btn_hide>
			
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
