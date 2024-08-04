<script lang="ts" setup>
	import { reactive, ref, defineEmits } from 'vue'
	import { useAxios } from '@/hooks'
	import { ipt_select } from '@/api/index'
	const emit = defineEmits(['selectChange']);
	const props = defineProps({
		ruleForm: {
			type: Object,
			required: true
		},
		listInput: {
			type: Object,
			required: true
		},
		disabled:{
			type: Boolean
		},
		params:{}
	})
	const options = ref([])
	const { loading, onSuccess, send } = useAxios(ipt_select,{
		immediate:false,
		localCache:props.listInput['localCache']
	});
	onSuccess((res)=>{
		options.value = res.data
	})
	const visibleChange = (v)=>{
		if(!props.listInput.every_time_request){
			if(!v || options.value.length > 0) return
			if(props.listInput.hasOwnProperty('options')) return options.value = props.listInput.options
		}
		send({
			url:props.listInput._url,
			params:props.params
		})
	}
	const selectChange = (v)=>{
		emit('selectChange',v,props.listInput)
	}
	//默认请求
	if(!props.listInput.default_not_request) visibleChange(true)
</script>
<!-- 
 @filterable		  { boolen }  是否可搜索
 @default_not_request { boolen }  是否默认请求/点击请求
 -->
<template>
	<a-select
		v-model="ruleForm[listInput.prop]"
		:placeholder="listInput.placeholder || '请选择' + listInput.label" 
		:loading='listInput.options?false:loading'
		@change="selectChange"
		@popup-visible-change="visibleChange"
		:filterable='listInput.filterable'
		:multiple="listInput.multiple"
		allow-clear
		:disabled='listInput.disabled || props.disabled'>
	    <a-option
	      v-for="item in options"
	      :key="item[listInput._value || 'id']"
	      :value="item[listInput._value || 'id']"
	    >{{item[listInput._label || 'value']}}</a-option>
	</a-select>
</template>