<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import Tdialog from '@/components/Templates/Tdialog.vue'
import Tform from '@/components/Templates/Tform.vue'
import { useAxios } from '@/hooks'
import { up_images, getUserResource, setUserResource } from '@/api/index'
import TuploadImg from '@/components/Templates/TuploadImg.vue'
import { notification } from 'ant-design-vue'

const emit = defineEmits()
let Update = reactive({
  title: '新增',
  width: '680px',
  isShow: false,
  modal: true,
  draggable: true
})

const _state = () => ({
  id: '',
  userId: '',
  businessLicense: [],
  openAccountPermit: [],
  idcardProve: [],
  valueAddPermit: [],
  other: []
})

const ruleForm = reactive(_state())
const listInput = [
  {
    type: 'custom',
    prop: 'all'
  }
]

const {
  loading: getLoading,
  onSuccess: getSuccess,
  onError: getError,
  send: getSend
} = useAxios(getUserResource, {
  immediate: false
})

getSuccess((res) => {
  for (let keys in ruleForm) {
    const item = res.data[keys]
    if (!['id', 'userId'].includes(keys)) {
      if (item) {
        ruleForm[keys] = item.split(',').map((row) => {
          return {
            name: row,
            uid: row,
            url: row,
            response: [row]
          }
        })
      } else {
        ruleForm[keys] = []
      }
    } else {
      ruleForm[keys] = item || null
    }
  }
})

getError((res) => {
  notification.error({
    title: '提示',
    message: res.data.message ?? '获取资料失败！',
    duration: 3000
  })
  Update.isShow = false
})

//open初始
const on_init = (row) => {
  Object.assign(ruleForm, _state())
  Update.isShow = true
  getSend({ userId: row.id })
}

//关闭
const RefTform = ref(null)
const close = () => {
  RefTform.value?.resetForm()
}

const { loading, data, onSuccess, onError, send } = useAxios(setUserResource, {
  immediate: false
})

onSuccess((res) => {
  notification.success({
    title: '提示',
    message: '新增成功!',
    duration: 3000
  })
  emit('onSuccess')
  Update.isShow = false
})
onError((res) => {
  notification.error({
    title: '提示',
    message: res.data.message ?? '新增失败！',
    duration: 3000
  })
})

//提交
const submit = (type) => {
  let data = {}
  for (let keys in ruleForm) {
    const item = ruleForm[keys]
    if (!['id', 'userId'].includes(keys)) {
      data[keys] = item.map((item) => item.response[0]).join(',')
    } else {
      data[keys] = item
    }
  }
  send(data)
}
//确认
const confirm = () => {
  RefTform.value?.submitForm()
}

//图片上传
const pathSuccess = (response, file, fileList, keys) => {
  ruleForm[keys] = fileList
}

//图片删除
const pathRemove = (file, fileList, keys) => {
  ruleForm[keys] = fileList
}

defineExpose({
  on_init
})
</script>

<template>
  <Tdialog :Update="Update" :loading="getLoading || loading" @confirm="confirm" @close="close">
    <Tform
      ref="RefTform"
      :loading="loading"
      :ruleForm="ruleForm"
      :listInput="listInput"
      @submit="submit"
      label_width="150px"
      btn_hide
    >
      <template #all="scope">
        <a-form-item label="营业执照" :prop="'businessLicense'" :rules="{ required: true, message: '请添加图片' }">
          <TuploadImg
            :up_img_api="up_images"
            :fileList="ruleForm.businessLicense"
            :size="1024 * 1024 * 10"
            sizeName="10MB"
            :limit="5"
            multiple
            @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'businessLicense')"
            @pathRemove="(file, fileList) => pathRemove(file, fileList, 'businessLicense')"
          ></TuploadImg>
        </a-form-item>
        <a-form-item
          label="基本户开户许可证"
          :prop="'openAccountPermit'"
          :rules="{ required: true, message: '请添加图片' }"
        >
          <TuploadImg
            :up_img_api="up_images"
            :fileList="ruleForm.openAccountPermit"
            :size="1024 * 1024 * 10"
            sizeName="10MB"
            :limit="5"
            multiple
            @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'openAccountPermit')"
            @pathRemove="(file, fileList) => pathRemove(file, fileList, 'openAccountPermit')"
          ></TuploadImg>
        </a-form-item>
        <a-form-item
          label="电信增值业务许可证"
          :prop="'valueAddPermit'"
          :rules="{ required: true, message: '请添加图片' }"
        >
          <TuploadImg
            :up_img_api="up_images"
            :fileList="ruleForm.valueAddPermit"
            :size="1024 * 1024 * 10"
            sizeName="10MB"
            :limit="5"
            multiple
            @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'valueAddPermit')"
            @pathRemove="(file, fileList) => pathRemove(file, fileList, 'valueAddPermit')"
          ></TuploadImg>
        </a-form-item>
        <a-form-item label="法人身份证正反面" :prop="'idcardProve'" :rules="{ required: true, message: '请添加图片' }">
          <TuploadImg
            :up_img_api="up_images"
            :fileList="ruleForm.idcardProve"
            :size="1024 * 1024 * 10"
            sizeName="10MB"
            :limit="5"
            multiple
            @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'idcardProve')"
            @pathRemove="(file, fileList) => pathRemove(file, fileList, 'idcardProve')"
          ></TuploadImg>
        </a-form-item>
        <a-form-item label="其他资质" :prop="'other'">
          <TuploadImg
            :up_img_api="up_images"
            :fileList="ruleForm.other"
            :size="1024 * 1024 * 10"
            sizeName="10MB"
            :limit="5"
            multiple
            @pathSuccess="(response, file, fileList) => pathSuccess(response, file, fileList, 'other')"
            @pathRemove="(file, fileList) => pathRemove(file, fileList, 'other')"
          ></TuploadImg>
        </a-form-item>
      </template>
    </Tform>
  </Tdialog>
</template>


<style scoped>
</style>
