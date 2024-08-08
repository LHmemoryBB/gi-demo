<template>
  <div class="bodyer">
    <div class="body-content">
      <div class="body-form">
        <form action="#" class="recharge">
          <div class="recharge-title clearfix">
            <span class="recharge-title-left" style="font-size: 16.9565px">
              <img width="28" height="28" src="@/assets/img/successNew.png" v-if="orderInfo.orderStatus == 2"/>
              <img width="28" height="28" src="@/assets/img/failRedNew.png" v-else/>
            </span>
            <div class="colorRed paySuccess">{{orderInfo.orderStatus == 2?'交费成功': '交费失败'}}</div>
          </div>
          <div class="recharge-title-content clearfix">
            <div class="recharge-contents">
              <span class="recharge-contents-up floatLeft">充值号码:</span>
              <span class="recharge-contents-down floatLeft">{{orderInfo.phone}}</span>
            </div>
            <div class="recharge-contents">
              <span class="recharge-contents-up floatLeft">充值金额:</span>
              <span class="recharge-contents-down floatLeft">{{orderInfo.par}}元</span>
            </div>
            <div class="recharge-contents">
              <span class="recharge-contents-up floatLeft">支付金额:</span>
              <span class="recharge-contents-down floatLeft">{{orderInfo.par}}元</span>
            </div>

            <div class="recharge-contents">
              <span class="recharge-contents-up floatLeft">充值时间:</span>
              <span class="recharge-contents-down floatLeft"
                >{{orderInfo.pushDate}}</span
              >
            </div>
          </div>
          <!--山西小渠道33S 交费中（01或者03）或者交费成功（02）的显示电子发票查询路径-->
          <div class="recharge-button clearfix">
            <a
              href="javascript:void(0)"
              id="toOrderQuery"
              matomotriggerbutton="131"
              data-storey="交费完成信息"
              class="look-button floatLeft seeOrder"
              >查看订单</a
            >
            <span id="continuePayfee">
              <a href="javascript:void(0)" class="submitbtn floatRight"
                >继续交费</a
              >
            </span>
          </div>
        </form>
      </div>
      <div class="toAPPBanner"></div>
      <div class="toastMsg"></div>
      <div id="evaluate" aria-atomic="true" aria-label="服务评价">
        <div
          class="evalInner"
          style="
            position: relative;
            background: rgb(255, 255, 255);
            padding: 0px 0px 9.41087px;
            margin: 8.15609px 9.41087px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          "
        >
          <div
            class="titleEmoji"
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              align-items: center;
            "
          >
            <div
              class="evalEmoji"
              style="
                position: relative;
                margin: 9.41087px 8.15609px 0px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div
                class="imgGroup"
                style="
                  width: 256.289px;
                  height: auto;
                  display: flex;
                  justify-content: space-between;
                  border-radius: 94.2029px;
                "
              >
                <div
                  class="emojiOut"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40.7734px;
                    border-radius: 94.2029px;
                  "
                >
                  <img
                    class="No1Img"
                    src="https://img.client.10010.com/manyidupingjia/images/emojifade1.png"
                    aria-atomic="true"
                    aria-label="非常不满意"
                    style="width: 32.9375px; height: 32.9375px; display: flex"
                  />
                </div>
                <div
                  class="emojiOut"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40.7734px;
                    border-radius: 94.2029px;
                  "
                >
                  <img
                    class="No2Img"
                    src="https://img.client.10010.com/manyidupingjia/images/emojifade2.png"
                    aria-atomic="true"
                    aria-label="不满意"
                    style="width: 32.9375px; height: 32.9375px; display: flex"
                  />
                </div>
                <div
                  class="emojiOut"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40.7734px;
                    border-radius: 94.2029px;
                  "
                >
                  <img
                    class="No3Img"
                    src="https://img.client.10010.com/manyidupingjia/images/emojifade3.png"
                    aria-atomic="true"
                    aria-label="一般"
                    style="width: 32.9375px; height: 32.9375px; display: flex"
                  />
                </div>
                <div
                  class="emojiOut"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40.7734px;
                    border-radius: 94.2029px;
                  "
                >
                  <img
                    class="No4Img"
                    src="https://img.client.10010.com/manyidupingjia/images/emojifade4.png"
                    aria-atomic="true"
                    aria-label="满意"
                    style="width: 32.9375px; height: 32.9375px; display: flex"
                  />
                </div>
                <div
                  class="emojiOut"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40.7734px;
                    border-radius: 94.2029px;
                  "
                >
                  <img
                    class="No5Img"
                    src="https://img.client.10010.com/manyidupingjia/images/emojilive5.png"
                    aria-atomic="true"
                    aria-label="非常满意"
                    style="width: 32.9375px; height: 32.9375px; display: flex"
                  />
                </div>
              </div>
              <div
                class="evalType"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  line-height: 1.1;
                  font-size: 13.1752px;
                  width: 73.3984px;
                  color: rgb(230, 0, 39);
                "
              >
                非常满意
              </div>
            </div>
          </div>

          <div
            class="tagsSets"
            style="
              width: calc(100% - 22px);
              display: flex;
              height: auto;
              align-content: space-between;
              flex-flow: wrap;
              margin: 10.6657px 7.5287px 0px;
            "
          >
            <div class="tag">响应非常快</div>
            <div class="tag">布局很友好</div>
            <div class="tag">提示特清晰</div>
            <div class="tag">操作很简便</div>
            <div class="tag">服务很全面</div>
            <div class="tag">交费很顺畅</div>
          </div>
          <div
            class="downarea"
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              flex-direction: row;
            "
          >
            <div
              class="ideatext"
              style="
                width: calc(100% - 22px);
                height: 75.9141px;
                position: relative;
                box-sizing: border-box;
                margin: 9.41087px auto 6.27391px;
                border: 1px solid rgb(238, 238, 238);
              "
            >
              <div
                class="lenTips"
                style="
                  position: absolute;
                  color: rgb(221, 221, 221);
                  font-size: 12.2341px;
                  right: 9.41087px;
                  bottom: 3.13696px;
                "
              >
                0/150
              </div>
              <textarea
                class="feedarea"
                maxlength="150"
                placeholder="您对我们的功能还有哪些建议或意见"
                style="
                  width: 100%;
                  height: 100%;
                  color: inherit;
                  box-sizing: border-box;
                  text-align: justify;
                  outline: none;
                  border: none;
                  resize: none;
                  overflow: auto scroll;
                  font-size: 12.2341px;
                  background: rgb(255, 255, 255);
                  padding: 10.352px;
                  user-select: text !important;
                "
              ></textarea>
            </div>
          </div>
          <button
            class="subbtn"
            style="
              width: 106.969px;
              height: 29.4844px;
              border-radius: 31.3696px;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              pointer-events: auto;
              margin: 14.1163px auto 0px;
              font-size: 16.9396px;
              font-weight: 400;
              color: rgb(230, 0, 39);
              display: flex;
              position: relative;
              background: rgb(255, 255, 255);
              border: 1px solid rgb(230, 0, 39);
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            "
          >
            提交
          </button>
        </div>
      </div>
      <div class="bannerTwo">
        <div class="swiper-container">
          <div class="new-container" style="display: none"></div>
          <div class="default-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" style="font-size: 0.18rem">
                <div
                  matomotriggerbutton="334"
                  data-storey="交费完成信息"
                  class="col25"
                >
                  <p>
                    <img src="@/assets/img/invoice.png" />
                  </p>
                  <div class="fonts" style="font-size: 13.8884px">电子发票</div>
                </div>
                <div
                  matomotriggerbutton="335"
                  data-storey="交费完成信息"
                  class="col25"
                >
                  <p>
                    <img src="@/assets/img/balance.png" />
                  </p>
                  <div class="fonts" style="font-size: 13.8884px">余额查询</div>
                </div>
                <div
                  matomotriggerbutton="336"
                  data-storey="交费完成信息"
                  class="col25"
                >
                  <p>
                    <img src="@/assets/img/datatrafic.png" />
                  </p>
                  <div class="fonts" style="font-size: 13.8884px">充流量</div>
                </div>
                <div
                  matomotriggerbutton="337"
                  data-storey="交费完成信息"
                  class="col25"
                >
                  <p>
                    <img src="@/assets/img/buyfee.png" />
                  </p>
                  <div class="fonts" style="font-size: 13.8884px">话费购</div>
                </div>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps(["orderInfo"])
const orderInfo = props.orderInfo
</script>

<style>
.bodyer {
  /* background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 59.06%); */
  background: #f8f8f8;
  position: absolute;
  width: 100%;
  overflow: auto;
}
.bodyer .body-content {
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-bottom: 10px;
}
.bodyer .body-content .body-form {
  background: #fff;
}
.bodyer .body-content .recharge .recharge-title .recharge-title-left img {
  width: 50.87px;
  height: 50.87px;
}
.bodyer .body-content .recharge {
  width: 100% !important;
  margin: 0 auto;
  padding-bottom: 18.84px;
  /* background: #FFFFFF; */
}
#evaluate {
  width: 370.781px;
  border-radius: 9.41087px;
  padding: 34.5065px 0px 6.27391px;
  margin: 9.60938px auto;
  position: relative;
  z-index: 0;
  display: block;
  background: url("@/assets/img/20220223035310.png") left top / 100% no-repeat;
  box-shadow: rgba(238, 238, 238, 0.7) 0px 0px 4px;
}
.bodyer .body-content .recharge .recharge-title {
  width: 100%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 16px;
}
.bodyer .body-content .recharge .recharge-title .recharge-title-left {
  /* width: 0.28rem; */
  /* height: 0.28rem; */
  font-size: 17px;
  text-align: center;
  line-height: 17px;
  color: #ffffff;
  display: inline-block;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  display: block;
  margin: 0 auto 11px;
}

.bodyer .body-content .recharge .recharge-title .colorRed.paySuccess {
  margin: 22.6px auto 17.89px auto !important;
}
.bodyer .body-content .recharge .recharge-title .colorRed {
  color: #333;
  font-weight: 500;
  /* line-height: 0.25rem; */
  font-size: 16.9565px;
  /* margin-left: 0.12rem; */
}
.bodyer .body-content .body-form .recharge-title-content {
  width: 88%;
  margin: 6% auto 0;
  font-size: 0.15rem;
}
.bodyer .body-content .body-form .recharge-title-content {
  width: 88%;
  margin: 6% auto 0;
  font-size: 15.0725px;
}
.bodyer .body-content .body-form .recharge-title-content .recharge-contents {
  height: auto;
  width: 100%;
  position: relative;
  margin: 0 auto;
  margin-bottom: 9.42px;
  display: flex;
  justify-content: space-between;
}
.bodyer
  .body-content
  .body-form
  .recharge-title-content
  .recharge-contents
  .recharge-contents-up {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  /* font-size: 0.16rem; */
  line-height: 20.7246px;
  color: #666;
  /* width: 40%; */
  text-align: left;
}
.bodyer
  .body-content
  .body-form
  .recharge-title-content
  .recharge-contents
  .recharge-contents-down {
  display: inline-block;
  /* width: 1.8rem; */
  word-wrap: break-word;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  /* font-size: 0.16rem; */
  line-height: 20.7246px;
  color: #333333;
  margin-left: 11.3043px;
  text-align: right;
  flex: 1;
}
.bodyer .body-content .body-form .recharge-button {
  width: 85.5%;
  margin: 28.2734px auto 0;
}
.bodyer .body-content .body-form .recharge-button .look-button {
  border: 1px solid #e60027;
  box-sizing: border-box;
  /* -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem; */
  border-radius: 40px;
  width: 47%;
  height: 39.5625px;
  background: #ffffff;
  font-family: PingFang SC;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 16.9565px;
  text-align: center;
  color: #e60027;
  display: inline-block;
  line-height: 39.5625px;
  cursor: pointer;
  text-decoration: none;
}
.bodyer .body-content .body-form .recharge-button .submitbtn {
  width: 47%;
  height: 39.5625px;
  background: #e60027;
  /* -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem; */
  border-radius: 40px;
  font-family: PingFang SC;
  font-style: normal;
  /* font-weight: 500; */
  font-size: 16.9565px;
  text-align: center;
  color: #ffffff;
  display: inline-block;
  line-height: 39.5625px;
  cursor: pointer;
  text-decoration: none;
}
.floatLeft {
  /* float: left; */
}
.floatRight {
  float: right;
}
.toAPPBanner {
  width: 95%;
  height: 89.4922px;
  border-radius: 6px;
  margin: 18.84px auto 15.0725px !important;
  background: url(@/assets/img/toAPPNew.png) center no-repeat;
  background-size: 100%;
}
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  box-sizing: border-box;
  line-height: 1.1;
  font-size: 11.293px;
  width: 78.4219px;
  height: 16.9375px;
  color: rgb(153, 153, 153);
  border: 1px solid rgb(242, 242, 242);
  background: rgb(242, 242, 242);
  margin-top: 5.64652px;
  margin-right: 4px;
}
.bodyer .bannerTwo {
  width: 95%;
  height: 88.5469px;
  background: #ffffff;
  -webkit-border-radius: 7.53623px;
  -moz-border-radius: 7.53623px;
  border-radius: 7.53623px;
  margin: 18.8406px auto;
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  height: 100%;
}
.bodyer .bannerTwo .default-container {
  height: 100%;
}
.swiper-container-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  text-align: center;
  font-size: 0.18rem;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.col25 img {
  width: 25px;
  height: 25px;
}
.col25 .fonts {
  text-align: center;
  font-size: 13.1884px;
  /* line-height: 0.28rem; */
  text-align: center;
  color: #333;
}
</style>
