<template>
  <div class="page-container">
    <header class="page-head">
      <a class="icon-return" onclick="window.history.go(-1)"></a>
      订单详情
      <a class="icon-menu" id="icon-menu"></a>
    </header>
    <div class="bg_white">
      <!-- <div class="state-progress" v-if="orderInfo.orderStatus == 2">
        <el-steps :active="4" align-center :space="200">
          <el-step>
            <template #description>
              <span class="finish-text"> 下单成功 </span>
            </template>
            <template #icon>
              <img src="@/assets/img/yuandian.png" alt="Step 1" class="step-icon" />
            </template>
          </el-step>
          <el-step>
            <template #description>
              <span class="finish-text"> 完成支付 </span>
            </template>
            <template #icon>
              <img src="@/assets/img/yuandian.png" alt="Step 2" class="step-icon" />
            </template>
          </el-step>
          <el-step>
            <template #description>
              <span class="finish-text"> 发起充值 </span>
            </template>
            <template #icon>
              <img src="@/assets/img/yuandian.png" alt="Step 3" class="step-icon" />
            </template>
          </el-step>
          <el-step>
            <template #description>
              <span class="success-text"> 充值成功 </span>
            </template>
            <template #icon>
              <img src="@/assets/img/wancheng.png" alt="Step 3" class="step-icon" />
            </template>
          </el-step>
        </el-steps>
      </div>
      <div class="state-progress" v-else>
        <el-steps :active="2" align-center :space="200">
          <el-step>
            <template #description>
              <span class="finish-text"> 下单成功 </span>
            </template>
            <template #icon>
              <img src="@/assets/img/yuandian.png" alt="Step 1" class="step-icon" />
            </template>
          </el-step>
          <el-step>
            <template #description>
              <span style="corlor: red"> 支付失败 </span>
            </template>
            <template #icon>
              <img src="@/assets/img/shibai.png" alt="支付失败" class="step-icon" />
            </template>
          </el-step>
        </el-steps>
      </div> -->
      <div class="gprs-detail-inter"></div>
      <div class="gprs-order-detail">
        <p style="position: relative">
          <span>订单编号： </span>
          <span>{{orderInfo.voucher}}</span>
          <img src="@/assets/img/dl-copy.png" alt="" class="order-copy" />
        </p>
        <p><span>实际到账： </span> <span class="fc-blue2"> {{orderInfo.par}}元 </span></p>
      </div>
      <div class="gprs-detail-inter"></div>
      <div class="gprs-order-detail">
        <p>
          <span> 充值号码： </span>
          <span class="uni_mobileNo">{{orderInfo.phone}}</span>
          <img
            class="uni_viewconcent uni_viewno uni_viewnowatched"
            src="@/assets/img/watch.png"
            alt=""
          />
        </p>
        <p><span>应付金额：</span> <span> {{orderInfo.par}}元 </span></p>
        <p><span>实付金额：</span> <span> {{orderInfo.par}}元 </span></p>
        <p><span>下单时间：</span> <span> {{orderInfo.pushDate}} </span></p>
      </div>
      <div class="btn-oper font-28">
        <span
          class="delete status rechargerecord-btn-del grayborder"
          namevalue="删除"
        >
          删除订单
        </span>
        <span class="repayTwo status rechargerecord-btn-pay bg-blue"
          >再充一笔</span
        >
      </div>
    </div>
    <div class="App_operation">
      <div class="opera_top_uni">
        <div
          class="uni_prera_flex banner_gn_cli"
          urllink="https://h.app.coc.10086.cn/cmcc-app/personalBill/businessOrderNew.html?channelId=P00000062106&amp;yx=1092064003"
          actiontype="1"
          isshare="0"
          advbusitype="999"
          markid="1092064003"
          channelid="P00000062106"
          activityname="已订业务"
        >
          <img
            src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/9eb1149e8ef7447a9f9dd285d7937de3.png"
            alt=""
            class="uni_prera_img"
          />
          <span class="uni_prera_text" style="margin-top: 9.36px"
            >已订业务</span
          >
        </div>
        <div
          class="uni_prera_flex banner_gn_cli"
          urllink="https://h.app.coc.10086.cn/cmcc-app/setMealSurplus/setMealSurplusNew.html?channelId=P00000062107&amp;yx=1092064006"
          actiontype="1"
          isshare="0"
          advbusitype="999"
          markid="1092064006"
          channelid="P00000062107"
          activityname="余量查询"
        >
          <img
            src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/6c905e7566e04661a05fc527e30b652d.png"
            alt=""
            class="uni_prera_img"
          />
          <span class="uni_prera_text" style="margin-top: 9.36px"
            >余量查询</span
          >
        </div>
        <div
          class="uni_prera_flex banner_gn_cli"
          urllink="https://h.app.coc.10086.cn/cmcc-app/setMealSurplus/myPackage.html?channelId=P00000062108&amp;yx=1092064008"
          actiontype="1"
          isshare="0"
          advbusitype="999"
          markid="1092064008"
          channelid="P00000062108"
          activityname="我的套餐"
        >
          <img
            src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/e4d577de47cc4a1da0c0dadc3580678b.png"
            alt=""
            class="uni_prera_img"
          />
          <span class="uni_prera_text" style="margin-top: 9.36px"
            >我的套餐</span
          >
        </div>
        <div
          class="uni_prera_flex banner_gn_cli"
          urllink="https://h.app.coc.10086.cn/cmcc-app/personalBill/phoneBillsNew.html?channelId=P00000062109&amp;yx=1092064011"
          actiontype="1"
          isshare="0"
          advbusitype="999"
          markid="1092064011"
          channelid="P00000062109"
          activityname="账单查询"
        >
          <img
            src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/8b65d237b0934eefb06ebc60bbf95015.png"
            alt=""
            class="uni_prera_img"
          />
          <span class="uni_prera_text" style="margin-top: 9.36px"
            >账单查询</span
          >
        </div>
      </div>
      <div id="scrollPics">
        <ul class="slider" id="lb-list">
          <li class="opera_main_banner banner_gn_cli">
            <img
              class="opera_main_banner_detail"
              src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/b780de6308eb47b0be3824e01efe6e1c.png"
            />
          </li>
        </ul>
        <div class="num"><span class="activeLUnb">1/1</span></div>
      </div>
      <div class="opera_top_bottom">
        <div class="opera_bottom_bigIcon banner_gn_cli">
          <img
            class="opera_bottom_bigIcon_img"
            src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/4a2f93ad9458455088597743d432e3f8.png"
          />
          <span class="opera_bottom_bigIcon_text"> 月包特惠</span>
          <span class="opera_bottom_bigIcon_subtext"> 通用流量</span>
        </div>
        <div class="opera_bottom_bigIcon banner_gn_cli">
          <img
            class="opera_bottom_bigIcon_img"
            src="https://qwhdcdn.cmcc-cs.cn/prd-mgcenter/15c06d4be50e44e4a750b357e47ea85c.png"
          />
          <span class="opera_bottom_bigIcon_text"> 流量专区</span>
          <span class="opera_bottom_bigIcon_subtext"> 更多流量福利</span>
        </div>
        <div class="opera_bottom_bigIcon banner_gn_cli">
          <img
            class="opera_bottom_bigIcon_img"
            src="https://res.app.coc.10086.cn/group1/M00/04/5F/CtFOGGXhoEWAHxhfAAAPZ3zysEA526.png"
          />
          <span class="opera_bottom_bigIcon_text"> 首月1元购</span>
          <span class="opera_bottom_bigIcon_subtext"> 铂金会员权益</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Steps } from "ant-design-vue";
import { ref, defineProps } from 'vue'

const props = defineProps(["orderInfo"])
const orderInfo = props.orderInfo
</script>

<style>
.page-container {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  font-family: "Arial,Microsoft YaHei";
}
p {
  margin: 0 !important;
}
.page-head {
  background-color: #efefef;
  height: 40px;
  color: #333;
  font-size: 15px;
  position: relative;
  text-align: center;
  line-height: 40px;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 10px;
}
.icon-return {
    width: 40px;
    height: 40px;
    display: block;
    float: left;
    position: absolute;
    left: 0;
    top: 0;
}
.icon-return:before, .icon-return:after {
    content: '.';
    display: block;
    font-size: 0;
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent #333 transparent transparent;
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 50%;
    margin-left: -10px;
}
.icon-return:after {
    border-right-color: #efefef;
    margin-left: -7px;
}
.page-head .icon-menu {
    position: absolute;
    top: 20%;
    right: 10px;
    width: 28px;
    height: 28px;
    display: block;
    background: url('@/assets/img/icon-menu.png') center center no-repeat;
    background-size: 30px;
}
.bg_white {
  background-color: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.state-progress {
  width: 100%;
  height: 100px;
}
.el-steps {
  padding: 31px 0 14px;
}
.step-icon {
  width: 12px;
  height: 12px;
}
.el-step__icon.is-icon {
  width: 12px;
}
.el-step__head.is-finish {
  border-color: #a3c356;
}
.el-step.is-center .el-step__line {
  background-color: #a3c356;
}
.el-step.is-center .el-step__description {
  margin-top: 2px;
}
.success-text {
  color: #000;
}
.finish-text {
  color: #aeaeae;
}

.gprs-detail-inter {
  width: 100%;
  height: 10px;
  background-color: #efefef !important;
}
.gprs-order-detail p {
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #e4e4e4;
}
.order-icon {
  display: flex;
  align-items: center;
}
.order-copy {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
}
.fc-blue2 {
  color: #0085d0;
}
.uni_viewconcent {
  width: 16px;
  height: 16px;
  position: relative;
  top: 0px;
  left: 5px;
}
.btn-oper {
  padding: 0 !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
  height: 80px;
  line-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-oper span {
  display: inline-block;
  width: 177px;
  height: 47px;
  line-height: 47px;
  border-radius: 3px;
  text-align: center;
}
.grayborder {
  border: 1px solid #e2e2e2;
}
.font-28 {
  font-size: 14px;
}
.bg-blue {
  background: #33acfb;
  color: #fff;
}
.App_operation {
  padding-top: 10px;
}
.opera_top_uni {
  display: flex;
  width: 358.8px;
  height: 81.12px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
}
.uni_prera_flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.uni_prera_img {
  width: 24.95px;
  height: 24.95px;
}
.uni_prera_text {
  font-family: PingFang SC-Medium;
  font-size: 12.48px;
  color: #666;
  white-space: nowrap;
}
#scrollPics {
  position: relative;
}
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.opera_main_banner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 359.84px;
  position: relative;
}
.opera_main_banner_detail {
  width: 358.8px;
  height: 84.23px;
  border-radius: 10px;
  margin-top: 10px;
}

.num {
  position: absolute;
  width: 46.8px;
  height: 20.8px;
  background-color: #fff;
  border-radius: 7px;
  font-size: 12px;
  right: 30px;
  bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.opera_top_bottom {
  width: 358.8px;
  height: 120.63px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px auto;
}
.opera_bottom_bigIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.opera_bottom_bigIcon_img {
  width: 46.8px;
  height: 46.8px;
}
.opera_bottom_bigIcon_text {
  font-size: 12.48px;
  color: #000;
  font-family: "PingFang SC-Bold";
  margin-top: 7.8px;
}
.opera_bottom_bigIcon_subtext {
  font-size: 11.44px;
  color: #666;
  font-family: "PingFang SC-Medium";
  white-space: nowrap;
}
</style>
