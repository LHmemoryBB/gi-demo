<script setup>
	import { onMounted, onBeforeUnmount } from 'vue';
	import * as echarts from 'echarts';
	import { useAxios } from '@/hooks'
	import { getHomeDetail } from '@/api/index'
	import { notification } from 'ant-design-vue';

	const { loading, data:homeData, onSuccess, onError } = useAxios(getHomeDetail,{
		data_deconstruction:(res)=> res.data,
		immediate:true
	});
	onSuccess((res)=>{
		const monthAmount = res.data.monthAmount;
		const date = Object.keys(monthAmount);
		const data = Object.values(monthAmount);
		setOption(getOption(date, data));
	})
	onError((res)=>{
		notification.error({
			message: '提示',
			description:  res.message || '请求失败！',
			duration: 3
		})
	})
	
	
	var myChart,observer,option;

	const getOption = (date, data)=>{
		option = {
			tooltip: {
				trigger: 'axis',
				position: function(pt) {
					return [pt[0], '10%'];
				}
			},
			grid: {
				left: '2%',
				right: '2%',
				bottom: '3%',
				containLabel: true
			},
			title: {
				left: 'center',
				text: '近30天营业额折线图'
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: date
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: '营业额',
				type: 'line',
				symbol: 'none',
				sampling: 'lttb',
				itemStyle: {
					color: 'rgb(255, 70, 131)'
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(255, 158, 68)'
						},
						{
							offset: 1,
							color: 'rgb(255, 70, 131)'
						}
					])
				},
				data: data
			}]
		};
		return option
	}
	
	const setOption = (option)=>{
		myChart.showLoading({
			text: 'loading',
			color: '#a777e3',
			textColor: '#000',
			maskColor: 'rgba(255, 255, 255, 0.7)',
			zlevel: 0,
		});
		option && myChart.setOption(option);
		myChart.hideLoading()
	}
	
	onMounted(()=>{
		const chartDom = document.getElementById('main');
		myChart = echarts.init(chartDom);
		observer = new ResizeObserver(()=>{
			myChart.resize()
		});
		observer.observe(chartDom);
	})
	onBeforeUnmount(()=>{
		if(myChart){
			observer.disconnect();
			myChart.dispose();
		}
	})
	
</script>
<template>
	<div>
		<div class="card">
			<div class="content">
				<div class="fx_cj title">
					<span>今日营业额</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.todayAmount || 0}}<span class="unit">元</span></span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>今日订单充值到账总金额</span>
					<span>订单数量</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.todaySuccOrderAmount || 0}}<span class="unit">元</span></span>
					<span>{{homeData.todaySuccOrderNum || 0}}</span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>今日加款总金额</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.todayAddBalanceAmount || 0}}<span class="unit">元</span></span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>营业额</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.amount || 0}}<span class="unit">元</span></span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>昨日营业额</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.yesterdayAmount || 0}}<span class="unit">元</span></span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>昨日订单充值到账总金额</span>
					<span>订单数量</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.yesterdaySuccOrderAmount || 0}}<span class="unit">元</span></span>
					<span>{{homeData.yesterdaySuccOrderNum || 0}}</span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>昨日加款总金额</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.yesterdayAddBalanceAmount || 0}}<span class="unit">元</span></span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>用户人数</span>
				</div>
				<div class="fx_cj num">
					<span>{{homeData.totalUserNum || 0}}</span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>订单充值到账总金额</span>
					<span>订单数量</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.succOrderAmount || 0}}<span class="unit">元</span></span>
					<span>{{homeData.succOrderNum || 0}}</span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>订单充值中总金额</span>
					<span>订单数量</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.addingOrderAmount || 0}}<span class="unit">元</span></span>
					<span>{{homeData.addingOrderNum || 0}}</span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>加款总金额</span>
				</div>
				<div class="fx_cj num">
					<span><span class="currency">￥</span>{{homeData.addBalanceAmount || 0}}<span class="unit">元</span></span>
				</div>
			</div>
			<div class="content">
				<div class="fx_cj title">
					<span>用户总余额</span>
				</div>
				<div class="fx_cj num">
					<span>{{homeData.totalUserBalance || 0}}</span>
				</div>
			</div>
		</div>
		<div class="content">
			<div id="main" style="width: 100%;height: 400px;"></div>
		</div>
	</div>
</template>
<style scoped>
	.card {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 23px 15px;
		margin-bottom: 20px;
	}

	.card .content {
		margin: 0;
	}

	.card .title {
		font-size: 14px;
	}

	.card .num {
		margin-top: 7px;
		padding-top: 10px;
		border-top: 1px solid #e4e7ed;
		font-size: 18px;
		font-weight: 600;
	}

	.card .currency {
		font-size: 18px;
		color: #ffbc00;
	}

	.card .unit {
		font-size: 10px;
		color: #919191;
	}
</style>