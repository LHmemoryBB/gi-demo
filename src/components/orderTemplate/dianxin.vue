<template>
  <div class="dianxin-page">
    <div style="padding: 0; margin: 0" class="ui-content">
      <div class="detail_wrap">
        <div class="detail_line"></div>
        <div class="detail_header">
          <p class="phone_num" style="display: none">
            <span class="detail_user"></span>
            <span class="detail_phone"></span>
          </p>
        </div>
        <div class="detail_sales detail_clearfix">
          <div class="detail_product detail_clearfix">
            <div class="detail_img detail_fl">
              <img src="@/assets/img/recharebuess.png" />
            </div>
            <div class="detail_desc">
              <div class="detail_clearfix">
                <p class="detail_fl">
                  电信号码充值{{ Number(orderInfo.par).toFixed(1) }}元，谨防诈骗
                </p>
                <p class="detail_orange">￥{{ orderInfo.par }}</p>
              </div>
              <div class="clearfix p2"><p class="fr">X1</p></div>
              <div class="detail_clearfix">
                <p class="detail_fl">充值号码：{{ orderInfo.phone }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="detail_orderInfo">
          <div class="detail_form">
            <div class="detail_group detail_show">
              <span class="detail_label">订单编号</span>
              <span class="detail_maohao">：</span>
              <span class="detail_value detail_orderId">{{
                orderInfo.voucher
              }}</span>
              <span class="verticalline">|</span>
              <span class="copy">复制</span>
            </div>
            <div class="detail_group detail_show">
              <span class="detail_label">下单时间</span>
              <span class="detail_maohao">：</span>
              <span class="detail_value detail_createTime">{{
                dayjs(orderInfo.pushDate).format("YYYY.MM.DD HH:mm")
              }}</span>
            </div>
          </div>
          <div class="detail_form xiantiao">
            <div class="detail_group detail_pay">
              <span class="detail_label">支付方式</span>
              <span class="detail_maohao">：</span>
              <span class="detail_value detail_payMethod">在线支付-充值</span>
            </div>
            <div class="detail_group jine detail_show">
              <span class="detail_label shangpin">商品金额</span>
              <span class="detail_maohao">：</span>
              <span class="detail_value detail_salesPrice"
                >￥{{ Number(orderInfo.par).toFixed(2) }}</span
              >
            </div>
            <div class="detail_group yunfei detail_show">
              <span class="detail_label">运费</span>
              <span class="detail_maohao">：</span>
              <span class="detail_value detail_freightExpense">￥0.00</span>
            </div>
            <div class="detail_group" style="display: none">
              <span class="detail_label">优惠</span>
              <span class="detail_maohao">：</span>
              <span class="detail_value detail_discountAmount"></span>
            </div>
          </div>
          <div class="detail_total detail_group detail_show">
            <span class="detail_label">应付合计</span>
            <span class="detail_maohao">：</span>
            <span class="detail_value detail_realPrice jc_realPrice"
              >￥{{ orderInfo.par }}</span
            >
          </div>
          <div class="advertising_space" style="display: none">
            <img src=" " alt="" class=" " />
          </div>
        </div>
      </div>
      <div class="lowerpart">
        <div class="order_questions">
          <p class="doubt">对订单有疑问？</p>
          <div class="lookmore">
            <img src="@/assets/img/foot-like.png" alt="" class="tustar" />
            <span class="clickmore">查看更多服务</span>
            <img src="@/assets/img/arrow.png" alt="" class="gdtu" />
          </div>
        </div>
        <div class="each_question">
          <div class="wentide">充值失败如何处理？</div>
          <div class="wentide">流量包如何退订？</div>
          <div class="wentide">发票如何开具?</div>
          <div class="wentide">积分如何兑换？</div>
        </div>
        <div class="detail_kfBtns" style="text-align: right">
          <!-- 副卡加装新增服务评价 -->
          <!--在线客服-->
          <div class="detail_kfOnline" style="display: block">
            <img src="@/assets/img/zcxk.png" />在线客服
          </div>
          <div class="detail_feedback opinion" style="display: block">
            <img src="@/assets/img/yjfk.png" />意见反馈
          </div>
        </div>
      </div>
    </div>
    <div class="detail_footer detail_orderStatus">
      <div class="wenhao_triangle">
        <p class="detail_orderStatus">
          {{ orderInfo.orderStatus == 2 ? "充值成功" : "订单关闭" }}
        </p>
        <img class="questionmark" src="@/assets/img/wenhao.png" />
      </div>
      <div
        data-cancelpopflag=""
        data-payurl=""
        class="order_list_fr order_list_agine order_list_A"
      >
        再来一单
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import dayjs from "dayjs";
const props = defineProps(["orderInfo"]);
const orderInfo = props.orderInfo;
</script>

<style>
@font-face {
  font-family: "SourceHanSansCN-Regular";
  src: url("@/assets/img/SourceHanSansCN-Regular.ttf");
}
@font-face {
  font-family: "SourceHanSansCN-Medium";
  src: url("@/assets/img/SourceHanSansCN-Medium.ttf");
}
@font-face {
  font-family: "DIN-Medium";
  src: url("@/assets/img/DIN-Medium.ttf");
}
.dianxin-page {
  background: rgb(246, 246, 246);
  overflow-y: auto;
  min-height: 844px;
  position: relative;
  font-family: "微软雅黑";
  -webkit-font-smoothing: auto !important;
}
.detail_wrap {
  width: 100%;
  background-color: #fff;
}
.detail_line {
  width: 100%;
  height: 3.13px;
  background: url(@/assets/img/detail_line.png) no-repeat;
  background-size: 100% 100%;
}
.detail_header {
  width: 100%;
  height: 126.75px;
  background: url("@/assets/img/bf-head-bg.jpg") center center no-repeat;
  background-size: 100% 100%;
  padding: 12.5px 22.3958px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.detail_clearfix {
  zoom: 1;
  overflow: auto;
}
.detail_sales {
  width: 93.25%;
  background-color: #fff;
  -webkit-border-radius: 10.4167px;
  border-radius: 10.4167px;
  margin: 0 auto;
  z-index: 2;
  height: 120.24px;
  -webkit-box-shadow: 0px 2px 8px rgba(233, 199, 149, 0.2);
  box-shadow: 0px 2px 8px rgb(175 194 255 / 30%);
  padding: 0 11.9792px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 10.4167px;
  margin-top: -104.167px;
  overflow: hidden;
}
.detail_product {
  padding: 17.7083px 0;
}

.detail_fl {
  float: left;
}
.detail_img {
  display: block;
  width: 72.58px;
  height: 72.58px;
  border-radius: 5.20833px;
}
.detail_img img {
  display: block;
  width: 100%;
}
.detail_desc {
  padding-left: 80.2083px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.detail_desc > div:first-child {
  font-size: 14.0833px;
  color: #333;
  overflow: hidden;
}
.detail_desc > div:not(:first-child) {
  font-family: SourceHanSansCN-Regular;
  font-size: 12.4583px;
  color: #999;
  line-height: 21.875px;
}
.detail_desc > div:first-child > p:first-child {
  height: 31.25px;
  max-width: 70%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-height: 15.625px;
  font-family: SourceHanSansCN-Medium;
}
.detail_desc > div:first-child > p.detail_orange {
  font-family: SourceHanSansCN-Regular;
  font-size: 14.5833px;
  color: #ea5858;
  line-height: 15.625px;
  float: right;
}
.detail_desc .p2 {
  margin-top: 5px;
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
  line-height: 21.875px;
}
.detail_desc > div:not(:first-child) > p {
  text-align: right;
  max-width: 100%;
  line-height: 21.875px;
  font-family: SourceHanSansCN-Regular;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail_orderInfo {
  padding: 9.375px 12.5px 0 12.5px;
  margin-bottom: 12.5px;
}
.detail_form {
  padding: 10.4167px 0;
  border-bottom: 0.5px solid #eee;
}
.detail_group {
  padding: 0 10px;
  line-height: 29.25px;
}
.detail_show,
.detail_pay {
  display: flex;
}
.detail_group span {
  font-family: SourceHanSansCN-Regular;
}
.detail_group .verticalline {
  font-size: 10.8333px;
  padding-left: 3.25px;
  color: #333;
  overflow: hidden;
  word-break: break-word;
}
.detail_group .copy {
  font-size: 11.9167px;
  padding-left: 3.25px;
  color: #5b82ff;
  overflow: hidden;
  word-break: break-word;
}
.detail_label {
  width: 16%;
  display: inline-block;
  text-align-last: justify;
  white-space: nowrap;
  color: #999;
  font-size: 14.0833px;
}
.detail_maohao {
  font-size: 14.0833px;
  color: #999;
}
.detail_value {
  font-size: 14.0833px;
  color: #333;
  overflow: hidden;
  word-break: break-word;
}
.detail_total .detail_value {
  font-family: DIN-Medium;
  font-weight: bold;
}
.detail_total {
  line-height: 18.2292px;
  padding: 10.4167px;
}
.detail_total span {
  color: #ea5858;
}
.lowerpart {
  background-color: #fff;
  margin-bottom: 66.6667px;
}
.order_questions {
  display: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12.5px 0 12.5px;
}
.doubt {
  font-size: 16.25px;
  font-weight: normal;
  line-height: 41.6667px;
  color: #333333;
}
.lookmore {
  display: flex;
  align-items: center;
}
.tustar {
  width: 10.41px;
  margin-right: 10.93px;
}
.clickmore {
  font-size: 13px;
  font-weight: normal;
  line-height: 41.6667px;
  color: #999999;
}
.gdtu {
  width: 6.77px;
  height: 11.45px;
  margin-left: 5.20833px;
}
img {
  border: 0;
  vertical-align: middle;
}
.each_question {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  box-sizing: border-box;
}
.each_question div {
  width: 171.156px;
  height: 34.6562px;
  background-color: #f6f6f6;
  border-radius: 16.6667px;
  font-size: 14.0833px;
  font-weight: normal;
  color: #333333;
  line-height: 34.6562px;
  text-align: center;
  margin-right: 10.4167px;
  margin-bottom: 10.4167px;
}
.detail_kfBtns {
  position: relative;
  margin-top: 10.4167px;
  border-top: 1px solid #eeeeee;
  height: 52.0781px;
  margin-bottom: 20.8333px;
}
.detail_kfOnline {
  display: none;
  position: absolute;
  width: 50%;
  height: 52.0781px;
  font-size: 14.5833px;
  color: #333;
  line-height: 52.0781px;
  text-align: center;
  right: 0;
}
.detail_kfBtns .opinion {
  position: absolute;
  width: 50%;
  height: 54.1562px;
  font-size: 15.1667px;
  color: #333;
  line-height: 52.0781px;
  text-align: center;
  left: 0;
  border-right: 1px solid #eeeeee;
  box-sizing: border-box;
}
.detail_kfOnline img,
.detail_evaluate img,
.detail_kfPhone img,
.detail_feedback img {
  width: 19.5px;
  height: 19.5px;
  margin-right: 4.33333px;
  margin-top: -4.33333px;
}
.detail_orderStatus {
  font-family: SourceHanSansCN-Regular;
  font-size: 14.5833px;
  color: #5b82ff;
  line-height: 30.7292px;
}

.detail_fr {
  float: right;
  margin-top: -12.5px;
}
.order_list_fr {
  float: right;
}
.order_list_A {
  display: inline-block;
  width: 92.0781px;
  background-image: linear-gradient(-90deg, #5b82ff 0%, #7e9efb 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  border-radius: 16.25px;
  font-family: SourceHanSansCN-Regular;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0;
  color: #ffffff;
  height: 31.9531px;
  line-height: 31.9583px;
  text-align: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.detail_footer {
  width: 100%;
  max-width: 720px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  padding: 10.2917px 13px;
  -webkit-box-sizing: border-box;
  height: 53.625px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wenhao_triangle {
  display: flex;
}
.questionmark {
  width: 17.33px;
  height: 17.33px;
  margin-left: 7.5px;
  margin-top: 5.4px;
}
</style>
