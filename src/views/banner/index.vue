<script setup>
import { ref, reactive } from 'vue'
import Tform from '@/components/Templates/Tform.vue'
import TuploadImg from '@/components/Templates/TuploadImg.vue'
import { useAxios } from '@/hooks'
import { up_image, getBannerDetail, setBannerUpdate } from '@/api/index'
import { notification } from 'ant-design-vue'

const _state = () => ({
  id: '',
  banner: [],
  ydBanner: []
})
const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'custom',
    prop: 'all'
  }
]
const {
  loading: loadingDetail,
  onSuccess: onSuccessDetail,
  onError: onErrorDetail,
  send: sendDetail
} = useAxios(getBannerDetail, {
  immediate: false
})

//初始
const on_init = () => {
  sendDetail()
  onSuccessDetail((res) => {
    for (let keys in ruleForm) {
      ruleForm[keys] = res.data[keys] ?? ''
    }
    ruleForm.banner = ruleForm.banner.map((item) => {
      return {
        name: item,
        uid: item,
        url: item,
        response: [item]
      }
    })
    ruleForm.ydBanner = ruleForm.ydBanner.map((item) => {
      return {
        name: item,
        uid: item,
        url: item,
        response: [item]
      }
    })
  })
  onErrorDetail((res) => {
    notification.error({
      title: '提示',
      message: res.message || '数据异常！',
      duration: 3
    })
  })
}
on_init()

//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setBannerUpdate, {
  immediate: false
})
onSuccess((res) => {
  notification.success({
    title: '提示',
    message: res.message || '配置成功!',
    duration: 3
  })
})
onError((res) => {
  notification.error({
    title: '提示',
    message: res.message || '配置失败！',
    duration: 3
  })
})

//提交
const submit = (type) => {
  let data = {
    ...ruleForm,
    banner: ruleForm.banner.map((item) => item.response[0]),
    ydBanner: ruleForm.ydBanner.map((item) => item.response[0])
  }

  send(data)
}

//确认
const confirm = () => {
  RefTform.value?.submitForm()
}

// //图片上传
// const pathSuccess = (response, file, fileList)=>{
// 	ruleForm.banner = fileList
// }
// //图片删除
// const pathRemove = (file, fileList)=>{
// 	ruleForm.banner = fileList
// }

//图片上传
const pathSuccess = (response, file, fileList, keys) => {
  ruleForm[keys] = fileList
}

//图片删除
const pathRemove = (file, fileList, keys) => {
  ruleForm[keys] = fileList
}
</script>

<template>
  <div class="page-container">
    <div class="form-container">
      <Tform
        ref="RefTform"
        :loading="loading"
        :ruleForm="ruleForm"
        :listInput="listInput"
        @submit="submit"
        label_width="120px"
        querytext="修改"
      >
        <template #all="scope">
          <a-form-item
            label="PC轮播图"
            :name="'banner'"
            :rules="{ required: true, message: '请添加图片' }"
            laba-width="120px"
          >
            <TuploadImg
              :up_img_api="up_image"
              :fileList="ruleForm.banner"
              :size="1024 * 1024 * 10"
              sizeName="10MB"
              :limit="3"
              multiple
              @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'banner')"
              @pathRemove="(file, fileList) => pathRemove(file, fileList, 'banner')"
            ></TuploadImg>
          </a-form-item>
          <a-form-item
            label="移动轮播图"
            :name="'ydBanner'"
            :rules="{ required: true, message: '请添加图片' }"
            laba-width="120px"
          >
            <TuploadImg
              :up_img_api="up_image"
              :fileList="ruleForm.ydBanner"
              :size="1024 * 1024 * 10"
              sizeName="10MB"
              :limit="3"
              multiple
              @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'ydBanner')"
              @pathRemove="(file, fileList) => pathRemove(file, fileList, 'ydBanner')"
            ></TuploadImg>
          </a-form-item>
        </template>
      </Tform>
    </div>
  </div>
</template>

<style scoped>
.fixed_width_box {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-top: 10px;
}
.fixed_width {
  display: flex;
  flex-direction: column;
}
</style>
