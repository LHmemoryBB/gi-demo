<script setup>
	import { reactive, ref } from 'vue';
	import { useAxios } from '@/hooks'
	import { getOrderFlow } from '@/api/index'
	import Tform from '@/components/Templates/Tform.vue';
	import Ttable from '@/components/Templates/Ttable.vue';
	import Tselect from '@/components/Templates/Tselect.vue';

	const ruleForm = reactive({
		operator: '',
		orderId: ''
	})
	
	const { loading, data, onSuccess, onError, send } = useAxios(getOrderFlow,{
		defaultParams: ruleForm,
		immediate:false
	});
	
	const orderData = ref([])
	const dataItem = ref({})
	onSuccess((res)=>{
		ElNotification.success({
			title: '提示',
			message: res.message || '暂无数据!',
			duration: 3000
		})
		orderData.value = res.data
		dataItem.value = res.data.item
	})
	onError((res)=>{
		ElNotification.error({
			title: '提示',
			message:  res.message || '查询失败！',
			duration: 3000
		})
	})


	const submit = (type) => {
		send()
	}
	
	const resetForm = () => {
		data.value = []
	}


</script>

<template>
	<div>
		<div class="content content_form">
			<Tform :loading="loading" :ruleForm="ruleForm" :listInput="[]" @submit="submit" @resetForm="resetForm" inline querytext='查询'>
				<el-form-item label="运营商" prop="operator" :rules="{ required: true, message: '请选择运营商' }">
					<Tselect :ruleForm="ruleForm" :listInput="{
						label:'运营商',
						prop: 'operator',
						_url:'/product/operator',
						_value:'id',
						_label:'value',
						default_not_request:true,
						every_time_request:true
					}"/>
				</el-form-item>
				<el-form-item label="流水号" prop="orderId" :rules="{ required: true, message: '请选择流水号' }">
					<el-input v-model="ruleForm.orderId" placeholder="请输入流水号" clearable />
				</el-form-item>
			</Tform>
		</div>
		<div class="content">
			  <el-descriptions class="margin-top" title="流水信息" :column="3"  border>
			    <el-descriptions-item>
			      <template #label>
			        <div class="cell-item">
			          <el-icon style="6px"><user /></el-icon>流水号
			        </div>
			      </template>
				  <div v-if="orderData">{{orderData.orderId}}</div>
			    </el-descriptions-item>
			    <el-descriptions-item >
			      <template #label>
			        <div class="cell-item">
			          <el-icon style="6px"><Coin /></el-icon>订单金额
			        </div>
			      </template>
				  <div v-if="orderData">{{orderData.orderPrice}}</div>
			    </el-descriptions-item>
			    <el-descriptions-item >
			      <template #label>
			        <div class="cell-item">
			          <el-icon style="6px"><Goods /></el-icon>商品编码
			        </div>
			      </template>
				  <div v-if="orderData">{{orderData.shopId}}</div>
			    </el-descriptions-item>
				</el-descriptions>
				<el-descriptions class="margin-top" title="充值信息" :column="3"  border>
			    <el-descriptions-item>
			      <template #label>
			        <div class="cell-item">
			          <el-icon style="6px"><Goods /></el-icon>商品名称
			        </div>
			      </template>
				  <div v-if="dataItem">{{dataItem.salesProName}}</div>
			    </el-descriptions-item>
				<el-descriptions-item >
				  <template #label>
				    <div class="cell-item">
				      <el-icon style="6px"><Position /></el-icon>支付方式
				    </div>
				  </template>
				  <div v-if="orderData">{{orderData.payMethodDescription}}</div>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
				    <div class="cell-item">
				      <el-icon style="6px"><Aim /></el-icon>订单状态
				    </div>
				  </template>
				  <div v-if="orderData">{{orderData.orderStatusDescription}}</div>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
				    <div class="cell-item">
				      <el-icon style="6px"><Iphone /></el-icon>充值号码
				    </div>
				  </template>
				  <div v-if="dataItem">{{dataItem.phoneNumber}}</div>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
				    <div class="cell-item">
				      <el-icon style="6px"><Coin /></el-icon>充值金额
				    </div>
				  </template>
				  <div v-if="dataItem">{{dataItem.price}}</div>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
				    <div class="cell-item">
				      <el-icon style="6px"><Coin /></el-icon>支付金额
				    </div>
				  </template>
				  <div v-if="dataItem">{{dataItem.realPrice}}</div>
				</el-descriptions-item>
			  </el-descriptions>
			  <el-descriptions class="margin-top" title="订单时间" :column="3"  border>
				  <el-descriptions-item>
				    <template #label>
				      <div class="cell-item">
				        <el-icon style="6px"><Timer /></el-icon>订单创建时间
				      </div>
				    </template>
					<div v-if="orderData.createDate">{{orderData.createDate}}</div>
				  </el-descriptions-item>
				  <el-descriptions-item>
				    <template #label>
				      <div class="cell-item">
				        <el-icon style="6px"><Timer /></el-icon>等待付款时间
				      </div>
				    </template>
					<div v-if="orderData.waitPayDate">{{orderData.waitPayDate}}</div>
				  </el-descriptions-item>
				  <el-descriptions-item>
				    <template #label>
				      <div class="cell-item">
				        <el-icon style="6px"><Timer /></el-icon>发起支付时间
				      </div>
				    </template>
					<div v-if="orderData.payDate">{{orderData.payDate}}</div>
				  </el-descriptions-item>
				  <el-descriptions-item>
				    <template #label>
				      <div class="cell-item">
				        <el-icon style="6px"><Timer /></el-icon>订单充值时间
				      </div>
				    </template>
					<div v-if="orderData.addDate">{{orderData.addDate}}</div>
				  </el-descriptions-item>
				  <el-descriptions-item v-if="orderData.refundDate">
				    <template #label>
				      <div class="cell-item">
				        <el-icon style="6px"><Timer /></el-icon>退款到账时间
				      </div>
				    </template>
					<div>{{orderData.refundDate}}</div>
				  </el-descriptions-item>
				  <el-descriptions-item v-if="orderData.successDate">
				    <template #label>
				      <div class="cell-item">
				        <el-icon style="6px"><Timer /></el-icon>充值成功时间
				      </div>
				    </template>
					<div>{{orderData.successDate}}</div>
				  </el-descriptions-item>
			  </el-descriptions>
		</div>
	</div>
</template>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>