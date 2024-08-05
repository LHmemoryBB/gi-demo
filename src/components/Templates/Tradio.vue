<script lang="ts" setup>
import { reactive, ref, defineEmits,defineProps } from 'vue'
import { ipt_select } from '@/api/index'
const emit = defineEmits();
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
  send({
    url:props.listInput._url,
    params:props.params
  })
}
const radioChange = (v)=>{
  emit('radioChange',v,props.listInput)
}
// 默认请求
visibleChange(true)
</script>
<!-- 
 @default_not_request { boolen }  是否默认请求/点击请求
-->
<template>
  <a-radio-group
    v-model="ruleForm[listInput.prop]"
    @change="radioChange"
    :disabled='listInput.disabled || props.disabled'>
    <a-radio
      v-for="item in options"
      :key="item[listInput._value || 'id']"
      :value="item[listInput._value || 'id']">
      {{ item[listInput._label || 'value'] }}
    </a-radio>
  </a-radio-group>
</template>
